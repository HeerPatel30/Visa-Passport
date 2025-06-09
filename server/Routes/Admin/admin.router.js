import express from "express"
import {AddAdmin , AdminLogin, adminpassportupdate, chartandcount, listpassport } from "../../Controller/Admin/Admin.controller.js"
import auth from "../../Middleware/Auth.js"

const AdminRouter = express.Router()

// add admin 
AdminRouter.post("/admin/add" ,AddAdmin )

// login 
AdminRouter.post("/admin/login", AdminLogin)

AdminRouter.post("/admin/passportlist", auth , listpassport)
AdminRouter.post("/admin/passportupdate", auth, adminpassportupdate);
AdminRouter.post("/admin/chart",auth , chartandcount)

export default AdminRouter