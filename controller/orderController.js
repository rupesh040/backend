import orderModel from '../model/orderModel.js';
import userModel from '../model/userModel.js';


const addorder = async (req,res) => {
    try {  const{userId,ordername,number,servicename,servicedetail,state,city} = req.body
        const orderData = {
            userId,
            ordername,
            number,
            servicename,
            servicedetail,
            state,
            city
        }
        const order = new orderModel(orderData);
        await order.save()
        await userModel.findByIdAndUpdate(userId)
        res.json({success:true,message:"order placed"})
        console.log(orderData);
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}


const listorder =  async (req,res) => {
    try {
        const order = await orderModel.find({});
        res.json({success:true,order})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

export {addorder,listorder}