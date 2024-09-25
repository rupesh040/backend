import express from "express"
import {addorder,listorder} from "../controller/orderController.js"

const orderRouter = express.Router()

orderRouter.post('/add',addorder);
orderRouter.get('/list',listorder);


export default orderRouter;