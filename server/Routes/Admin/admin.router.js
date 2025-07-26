import express from "express"
import {AddAdmin , AdminLogin, adminpassportupdate, adminvisaupdate, chartandcount, deletepassport, listpassport, listvisa, visachartandcount } from "../../Controller/Admin/Admin.controller.js"
import auth from "../../Middleware/Auth.js"
import { deletevisa } from "../../Controller/Visa/visa.controller.js"

const AdminRouter = express.Router()

// add admin 
AdminRouter.post("/admin/add" ,AddAdmin )

// login 
AdminRouter.post("/admin/login", AdminLogin)

AdminRouter.post("/admin/passportlist", auth , listpassport)
AdminRouter.post("/admin/passportupdate", auth, adminpassportupdate);
AdminRouter.post("/admin/chart",auth , chartandcount)
AdminRouter.delete("/admin/passportdelete", auth, deletepassport);
AdminRouter.post("/admin/visaupdate",auth , adminvisaupdate)
AdminRouter.post("/admin/visalist",auth , listvisa)
AdminRouter.post("/admin/visachart", auth, visachartandcount);
AdminRouter.delete("/admin/visadelete", auth, deletevisa);
export default AdminRouter