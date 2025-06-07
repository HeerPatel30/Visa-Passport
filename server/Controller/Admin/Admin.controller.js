import md5 from "md5";
import Admin from "../../Models/User/Admin.js";
import jwt from "jsonwebtoken";
import Config from "../../Config/Config.js";
import Token from "../../Models/Token/token.js";


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
      message : "Inserted Successfully" , 
      status : 200 , 
      data : result
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
export{ AddAdmin, AdminLogin };
