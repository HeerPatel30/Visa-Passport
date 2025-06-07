import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema(
  {
    code : {
        type:String 
    } , 
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true
  }
);

const Admin = mongoose.model("Admin", AdminSchema);

export default Admin