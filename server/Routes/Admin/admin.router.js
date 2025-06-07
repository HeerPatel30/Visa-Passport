import express from "express"
import {AddAdmin , AdminLogin } from "../../Controller/Admin/Admin.controller.js"

const AdminRouter = express.Router()

// add admin 
AdminRouter.post("/admin/add" ,AddAdmin )

// login 
AdminRouter.post("/admin/login", AdminLogin)
export default AdminRouter