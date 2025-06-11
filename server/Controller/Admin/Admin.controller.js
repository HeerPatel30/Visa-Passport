import md5 from "md5";
import Admin from "../../Models/User/Admin.js";
import jwt from "jsonwebtoken";
import Config from "../../Config/Config.js";
import Token from "../../Models/Token/token.js";
import mongoose from "mongoose";
import PassportApplication from "../../Models/Applicants/Passport.js";

let ObjectId = mongoose.Types.ObjectId
const _Config = new Config()
// Add Admin
const AddAdmin = async (req, res) => {
  try {
    const formdata = req.body;
    const ResponseBody = {};

    const isExist = await Admin.findOne({ code: formdata.code });

    if (isExist) {
      return res.status(409).json({
        message: "Data already exists",
        status: 409,
        data: [],
      });
    }

    if (formdata.password) {
      formdata.password = md5(formdata.password);
    }

    const newAdmin = new Admin(formdata);
    const result = await newAdmin.save();

    ResponseBody = {
      message: "Inserted Successfully",
      status: 200,
      data: result
    }
    return res.status(200).json(ResponseBody);

  } catch (error) {
    console.error("Error in AddAdmin:", error);
    return res.status(500).json({
      message: "Internal server error",
      status: 500,
      error: error.message,
    });
  }
};

// Admin Login
const AdminLogin = async (req, res, next) => {
  try {
    const { code, password } = req.body;
    const hashedPassword = md5(password);

    const admin = await Admin.findOne({ code, password: hashedPassword });

    if (admin) {
      let key = _Config.Generatekey(12)
      let payload = {
        _id: admin._id,
        unq: key
      };

      const token = jwt.sign(payload, process.env.TOKEN_KEY, { expiresIn: "1d" });

      if (!token) {
        ResponseBody = {
          message: "Error While Generating the token.",
          status: 400
        }
        return res.status(400).json(ResponseBody)
      }
      let tokendata = {
        token: token,
        uid: admin._id,
        unqkey: key
      }
      const tokenresp = await Token.create(tokendata);

      // Set headers in the response, not the request
      res.set('token', token);
      res.set('uid', admin._id.toString());
      res.set('unqkey', key);

      return res.status(200).json({
        message: "Login successful",
        status: 200,
        data: admin,
      });
    } else {
      return res.status(401).json({
        message: "Invalid credentials",
        status: 401,
        data: [],
      });
    }
  } catch (error) {
    console.error("Error in AdminLogin:", error);
    return res.status(500).json({
      message: "Internal server error",
      status: 500,
      error: error.message,
    });
  }
};

const updateadmin = async (req, res, next) => {
  try {
    let formdata = req.body
    let ResponseBody = {}

    let isexist = await Admin.findOne({ _id: new ObjectId(formdata._id) })

    if (!isexist) {
      ResponseBody = {
        message: "Admin not found",
        status: 404,
        data: [],
      }
      return res.status(404).json(ResponseBody);
    }
    if (formdata.password) {
      formdata.password = md5(formdata.password);
    }
    const updatedAdmin = await Admin.findOneAndUpdate({ _id: new ObjectId(formdata._id) }, formdata, { new: true });

    if (!updatedAdmin) {
      ResponseBody = {
        message: "Failed to update admin",
        status: 500,
        data: [],
      }
      return res.status(500).json(ResponseBody);
    }
  } catch (error) {
    console.error("Error in updateadmin:", error);
    return res.status(500).json({
      message: "Internal server error",
      status: 500,
      error: error.message,
    });
  }
}

const listpassport = async (req, res, next) => {
  try {
    const formdata = req.body;
    const pipeline = [];

    // 1. Search logic
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

    // 2. Filter logic
    const filterQuery = {};

    if (formdata.filter) {
      const { status, bookletType, fromDate, toDate } = formdata.filter;

      if (status) filterQuery.status = status;
      if (bookletType) filterQuery.bookletType = bookletType;

      if (fromDate && toDate) {
        pipeline.push({
          $addFields: {
            date: { $substr: ["$submissionDate", 0, 10] }, // Extract 'YYYY-MM-DD'
          },
        });

        pipeline.push({
          $match: {
            date: {
              $gte: fromDate,
              $lte: toDate,
            },
          },
        })
      }
    }

    // Add remaining filter fields
    if (Object.keys(filterQuery).length > 0) {
      pipeline.push({ $match: filterQuery });
    }

    // 3. Pagination
    if (formdata.page && formdata.limit) {
      const page = parseInt(formdata.page);
      const limit = parseInt(formdata.limit);
      const skip = (page - 1) * limit;

     pipeline.push({
       $facet: {
         data: [{ $skip: skip }, { $limit: limit }],
         totalCount: [{ $count: "count" }],
       },
     });
    }

  
    // console.log("Pipeline:", JSON.stringify(pipeline))
    const data = await PassportApplication.aggregate(pipeline);

    if (data.length > 0) {
      return res.status(200).json({
        message: "Data fetched successfully",
        status: 200,
        data,
      });
    } else {
      return res.status(404).json({
        message: "No data found",
        status: 404,
        data: [],
      });
    }
  } catch (error) {
    console.error("Error in listpassport:", error);
    return res.status(500).json({
      message: "Internal server error",
      status: 500,
      error: error.message,
    });
  }
};


const adminpassportupdate = async ( req, res,next) => {
   try {
      let formdata = req.body 
      let ResponseBody = {}

      let isexist = await PassportApplication.findOne({ _id: new ObjectId(formdata._id) })
      if( !isexist) {
        ResponseBody = {
          message: "Passport not found",
          status: 404,
          data: [],
        }
        return res.status(404).json(ResponseBody);
      }
      let updatedata = await PassportApplication.findByIdAndUpdate({_id :new ObjectId(formdata._id)} , formdata , { new : true })

      if(!updatedata)
      {
        ResponseBody = {
          message: "Failed to update passport",
          status: 500,
          data: [],
        }
        return res.status(500).json(ResponseBody);

      }
      ResponseBody = {
        message: "Passport updated successfully",
        status: 200,
        data: updatedata
      };
      return res.status(200).json(ResponseBody);
    } catch (error) {
      console.error("Error in adminpassportupdate:", error);
      return res.status(500).json({
        message: "Internal server error",
        status: 500,
        error: error.message,
      });
    }
}

const chartandcount = async (req,res,next)=>{
  try {
      let formdata = req.body
      let ResponseBody = {}
      let pipeline = [
        {
           $group :{
            _id: "$status",
            count: { $sum: 1 } ,
            data: { $addToSet: "$$ROOT" }
           }
        }
      ]
      let totalcount = await PassportApplication.countDocuments();
      let data = await PassportApplication.aggregate(pipeline)
      if (data.length > 0) {
        ResponseBody = {
          message: "Data fetched successfully",
          status: 200,
          data: data ,
          total: totalcount,
        }
        return res.status(200).json(ResponseBody);
      } else {
        ResponseBody = {
          message: "No data found",
          status: 404,
          data: []
        }
        return res.status(404).json(ResponseBody);
      }   


  } catch (error) {
    console.error("Error in chartandcount:", error);
    return res.status(500).json({
      message: "Internal server error",
      status: 500,
      error: error.message,
    });
  }
}
export { AddAdmin, AdminLogin, updateadmin, listpassport, adminpassportupdate, chartandcount };
