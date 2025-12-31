import mongoose from "mongoose";
import Config from "../../Config/Config.js";
import Visa from "../../Models/Applicants/Visa.js";

let _Config = new Config()
let ObjectId = mongoose.Types.ObjectId;
const addvisa = async(req,res)=>{
    try {
      let formdata = req.body;
      if (req.files && req.files.length > 0) {
        const files = req.files;
        files.forEach((el) => {
          const field = el.fieldname;
          if (field === "passportCopy") {
            if (!formdata[field]) formdata[field] = [];
            formdata[field].push({
              url: el.path,
              uploadedAt: new Date(),
            });
          } else {
            formdata[field] = {
              url: el.path,
              uploadedAt: new Date(),
            };
          }
        });
      }
      formdata.visano = _Config.generate_random_applicationno(
        formdata.fullName
      );
      let data = new Visa(formdata);
      let result = await data.save();

      // ------------------------------------
      // 📧 SEND EMAIL AFTER VISA APPLY
      // ------------------------------------
      const emailText = `
      Dear ${formdata.fullName},

      Your visa application has been submitted successfully.

      Visa Application No: ${formdata.visano}
      Contact No: ${formdata.phone || "Not Provided"}
      Passport No: ${formdata.passportNo || "Not Provided"}

      We will notify you about updates.
    `;

      const emailHtml = `
      <h2>Visa Application Submitted</h2>
      <p>Dear <b>${formdata.fullName}</b>,</p>

      <p>Your visa application has been successfully submitted.</p>

      <table border="1" cellpadding="6">
        <tr>
          <td><b>Visa Application No</b></td>
          <td>${formdata.visano}</td>
        </tr>
        <tr>
          <td><b>Contact No</b></td>
          <td>${formdata.phone || "Not Provided"}</td>
        </tr>
        <tr>
          <td><b>Passport No</b></td>
          <td>${formdata.passportNo || "Not Provided"}</td>
        </tr>
      </table>

      <br/>
      <p>We will notify you about further updates.</p>
      <b>Regards,<br/>Visa Department</b>
    `;

      await sendemail(
        formdata.email, // user email
        "Visa Application Submitted", // subject
        emailText,
        emailHtml
      );
      // ------------------------------------

      res.json({
        message: "Applied for Visa Successfully.",
        status: 200,
        data: result,
      });
    } catch (error) {
        res.status(500).json({
          message: "Internal Server Error",
          error: error.message,
        });
    }
}

const updatevisa = async (req, res) => {
  try {
    let formdata = req.body;
    let exist = await Visa.findOne({ _id: new ObjectId(formdata._id) });

    if (!exist) {
      return res.status(404).json({
        message: "Application you want to update doesn't exist",
      });
    }

    let files = req.files;

    if (files && files.length > 0) {
      for (const el of files) {
        const field = el.fieldname;
        const existingField = exist?.[field];

        if (field === "passportCopy") {
          // Delete old files if any
          if (Array.isArray(existingField)) {
            for (const url of existingField) {
              await _Config.deleteCloudinaryFile(url.toString());
            }
          }

          formdata[field] = [
            {
              url: el.path,
              uploadedAt: new Date(),
            },
          ];
        } else {
          // Delete previous single file
          if (existingField?.url) {
            await _Config.deleteCloudinaryFile(existingField.url.toString());
          }

          formdata[field] = {
            url: el.path,
            uploadedAt: new Date(),
          };
        }
      }
    }

    const updatedata = await Visa.findByIdAndUpdate(
      formdata._id,
      formdata,
      { new: true }
    );

    if (updatedata) {
      return res.status(200).json({
        message: "Visa updated successfully.",
        status: 200,
        data: updatedata,
      });
    } else {
      return res.status(400).json({
        message: "Update failed",
        status: 400,
      });
    }
  } catch (error) {
    res.status(500).json({
      error: error.message,
      status: 500,
      message: "Internal Server Error",
    });
  }
};


const deletevisa = async (req, res) => {
  try {
    const formdata = req.body;

    const exist = await Visa.findOne({ _id: new ObjectId(formdata._id) });
    if (!exist) {
      return res.status(404).json({
        message: "Visa Application not found.",
        status: 404,
      });
    }

    // 🔁 Loop through all fields in the document
    for (const field in exist.toObject()) {
      const value = exist[field];

      // Handle arrays of files (like passportCopy, aadharCopy)
      if (Array.isArray(value)) {
        for (const file of value) {
          if (file?.url) {
            await _Config.deleteCloudinaryFile(file.url);
          }
        }
      }

      // Handle single file objects (like photo, signature)
      else if (value?.url) {
        await _Config.deleteCloudinaryFile(value.url);
      }
    }

    // 🗑️ Delete the visa application document
    await Visa.findByIdAndDelete(formdata._id);

    return res.status(200).json({
      message: "Visa Application and all associated files deleted successfully.",
      status: 200,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      status: 500,
      error: error.message,
    });
  }
};



const visalist = async (req,res)=>{
    try {
        let formdata = req.body 

        let exist = await Visa.findOne({visano : formdata.visano})
    
        if(exist)
        {
           return res.status(200).json({
                status : 200 ,
                message : "Data Found.",
                data: exist
            })
        }
        else{
           return res.status(404).json({
             status: 404,
             message: "No Data Found.",
             data: [],
           });
        }
    } catch (error) {
       res.status(500).json({
         message: "Internal Server Error",
         error: error.message
       });
    }
}

const searchvisa = async (req, res) => {
  try {
     let formdata = req.body 
     let ResponseBody = { }
     let pipeline  = []

     if (formdata.search) {
       if (formdata.search) {
         let searchableFields = [
           "visano",
           "fullName",
           "email",
           "phone",
           "passportNumber",
           "visaType",
           "destinationCountry",
         ];
         let orQuery = searchableFields.map((field) => ({
           [field]: { $regex: formdata.search, $options: "i" },
         }));
         pipeline.push({ $match: { $or: orQuery } });
       }
        let data = await Visa.aggregate(pipeline);
        if (data.length === 0) {
          ResponseBody = {
            message: "No visa applications found",
            status: 404,
            data: [],
          };
          return res.status(404).json(ResponseBody);
        } else {
          ResponseBody = {
            message: "Visa applications found",
            status: 200,
            data: data,
          };
          return res.status(200).json(ResponseBody);
        }
      }
  } catch (error) {
    console.error("Search Visa Error:", error);
    return res.status(500).json({
      message: "Internal server error",
      status: 500,
      data: error.message,
    });
  }
};  
export { addvisa, updatevisa, deletevisa, visalist, searchvisa };