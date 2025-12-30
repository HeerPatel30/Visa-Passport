import mongoose from "mongoose";
import Config from "../../Config/Config.js";
import PassportApplication from "../../Models/Applicants/Passport.js";

let _Config = new Config()
let ObjectId = mongoose.Types.ObjectId
const addpassport = async (req, res, next) => {
    try {
        const files = req.files;
        const formdata = req.body;

        if (!files || files.length === 0) {
            return res.status(400).json({
                message: "No files uploaded",
                status: 400,
                data: [],
            });
        }

        const documents = {};
        for (const file of files) {
            const field = file.fieldname;

            if (field === "others") {
                if (!documents[field]) documents[field] = [];
                documents[field].push(file.path);
            } else {
                documents[field] = file.path;
            }
        }

        //  application code generate 
        let code = _Config.generate_random_applicationno(formdata.firstname);
        formdata.code = code;
        const newPassport = new PassportApplication({
            ...formdata,
            documents,
        });

        await newPassport.save();

        res.status(200).json({
            message: "Passport application submitted successfully",
            status: 200,
            data: newPassport,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal server error",
            status: 500,
            data: error.message,
        });
    }
};

const updatepassport = async (req, res) => {
    try {
        const formdata = req.body;
        const files = req.files;
        

        const existingPassport = await PassportApplication.findOne({ _id: new ObjectId(formdata._id) });

        if (!existingPassport) {
            return res.status(404).json({
                message: "Passport application not found",
                status: 404,
                data: [],
            });
        }

        const updatedDocuments = { ...existingPassport.documents };

        if (files && files.length > 0) {
            for (const file of files) {
                const field = file.fieldname;

                // Delete old document from cloudinary if field exists
                const oldDoc = existingPassport.documents?.[field];

                if (oldDoc) {
                    // Handle "others" as an array of URLs
                    if (field === "others" && Array.isArray(oldDoc)) {
                        for (const url of oldDoc) {
                            await _Config.deleteCloudinaryFile(url);
                        }
                        updatedDocuments[field] = [file.path];
                    } else {
                        await _Config.deleteCloudinaryFile(oldDoc);
                        updatedDocuments[field] = file.path;
                    }
                } else {
                    // If it’s a new field entirely
                    updatedDocuments[field] = field === "others" ? [file.path] : file.path;
                }
            }
        }

        const updatedPassport = await PassportApplication.findOneAndUpdate(
            { _id: new ObjectId(formdata._id) },
            { ...formdata, documents: updatedDocuments },
            { new: true }
        );

        return res.status(200).json({
            message: "Passport application updated successfully",
            status: 200,
            data: updatedPassport,
        });

    } catch (error) {
        console.error("Update Passport Error:", error);
        return res.status(500).json({
            message: "Internal server error",
            status: 500,
            data: error.message,
        });
    }
};


const listpassport = async (req, res, next) => {
    try {
        let formdata = req.body 
        let ResponseBody = { }
        let isexist = await PassportApplication.findOne({ code : formdata.code })
        if (!isexist) {
            ResponseBody = {
                message: "Passport application not found",
                status: 404,
                data: [],
            }
            return res.status(404).json(ResponseBody);
        } else {
            ResponseBody = {
                message: "Passport application found",
                status: 200,
                data: isexist,
            }
            return res.status(200).json(ResponseBody);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal server error",
            status: 500,
            data: error.message,
        });
    }
}
const searchpassport = async (req, res, next) => {
  try {
    let formdata = req.body;
    let ResponseBody = {};
    let pipeline = [];
    if (formdata.search) {
      const searchableFields = [
        "code",
        "firstname",
        "middlename",
        "lastname",
        "email",
        "phone",
        "alternatePhone",
        "nationality",
        "occupation",
        "organization",
        "designation",
        "fatherName",
        "motherName",
        "spouseName",
        "status",
      ];

      const orQuery = searchableFields.map((field) => ({
        [field]: { $regex: formdata.search, $options: "i" },
      }));

      pipeline.push({ $match: { $or: orQuery } });
    }
    let data = await PassportApplication.aggregate(pipeline);
    if (data.length === 0) {
      ResponseBody = {
        message: "No passport applications found",
        status: 404,
        data: [],
      };
      return res.status(404).json(ResponseBody);
    } 
    else {  
        ResponseBody = {
        message: "Passport applications found",
        status: 200,
        data: data,
      };
      return res.status(200).json(ResponseBody);
    }
  } catch (error) {
    console.error("Search Passport Error:", error);
    return res.status(500).json({
      message: "Internal server error",
      status: 500,
      data: error.message,
    });
  }
};
const deletepassport = async (req,res,next)=>{
    try {
        let formdata = req.body 
        let ResponseBody = {}
        let isexist = await PassportApplication.findOne({_id : formdata._id});
        if(!isexist){       
            ResponseBody = {
                message: "Passport application not found",
                status: 404,
                data: [],
            }
            return res.status(404).json(ResponseBody);
        }
        else {
             const documents = isexist.documents || {};
            for (const field in documents) {
                const doc = documents[field];

                if (Array.isArray(doc)) {
                    for (const url of doc) {
                        if (typeof url === "string") {
                            await _Config.deleteCloudinaryFile(url);
                        }
                    }
                } else if (typeof doc === "string") {
                    await _Config.deleteCloudinaryFile(doc);
                }
            }
            let deletepassport = await PassportApplication.findOneAndDelete(
                {_id: new ObjectId(formdata._id)}     )
            ResponseBody = {
                message: "Passport application deleted successfully",
                status: 200,
                data: deletepassport,
            };  
            return res.status(200).json(ResponseBody);

        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal server error",
            status: 500,
            data: error.message,
        });
    }
}
export { addpassport, updatepassport, listpassport, deletepassport , searchpassport};
