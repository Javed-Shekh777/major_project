const Order = require("../../models/order.model");

const getAllOrders =async (req,res)=>{

    try {

        const sessionUserId = req.userId
        

        
      
        const allOrders =  await Order.find({user:sessionUserId}).populate({path:"user",select:"-password"}).populate('orderItems.productId').sort({ createdAt : -1 });
        if(!allOrders){
            return res.status(400).json({
                message : "Order not fetched",
                error : true,
                success : false
            });
        }

        return res.status(200).json({
            message : "All Orders",
            success : true,
            error : false,
            data : allOrders
        });


        
    } catch (error) {
       return res.status(400).json({
            message : error.message || error,
            error : true,
            success : false
        });
        
    }
}


module.exports = getAllOrders;