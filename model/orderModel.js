import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    // userId:{type:String, required:true},
    ordername:{type:String, required:true},
    number:{type:Number, required:true},
    servicename:{type:String, required:true},
    servicedetail:{type:String, required:true},
    state:{type:String, required:true},
    city:{type:String, required:true},
})

const orderModel = mongoose.models.order || mongoose.model("order" ,orderSchema)


export default orderModel;