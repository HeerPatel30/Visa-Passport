import express from 'express'
import { uploadsdocuments } from '../../Middleware/Uploads.js'
import { addpassport, deletepassport, listpassport, updatepassport } from '../../Controller/Passport.js/passport.controller.js'


const passportRouter = express.Router()


// add 
passportRouter.post('/passport/add',uploadsdocuments,addpassport)

passportRouter.post('/passport/update',uploadsdocuments,updatepassport) 

passportRouter.post('/passport/list',listpassport)

passportRouter.delete('/passport/delete',deletepassport)
export default passportRouter