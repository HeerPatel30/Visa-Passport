import express from "express"
import { uploadsdocuments } from "../../Middleware/Uploads.js";
import { addvisa, deletevisa, searchvisa, updatevisa, visalist } from "../../Controller/Visa/visa.controller.js";

const visarouter = express.Router();

visarouter.post("/visa/add", uploadsdocuments, addvisa);
visarouter.post("/visa/update", uploadsdocuments, updatevisa); 
visarouter.delete("/visa/delete", deletevisa);
visarouter.post("/visa/list", visalist) 
visarouter.post("/visa/search",searchvisa)
export default visarouter;