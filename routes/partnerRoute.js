import express from "express"
import {partnersignup, partnerlogin} from "../controller/partnerController.js"

const partnerRouter = express.Router();

partnerRouter.post("/partnersignup", partnersignup)
partnerRouter.post("/partnerlogin", partnerlogin)

export default partnerRouter;