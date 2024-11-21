const uploadProductPermission = require("../../helpers/permission");
const Order = require("../../models/order.model");

const cancelOrder =async (req,res)=>{

    try {

        const sessionUserId = req.userId;

        const {_id} = req.body;
        if(!_id){
            return res.json({
                message : "Order id is required",
                success : false,
                error : true,
                data : null
            });
        }

        const order =  await Order.findByIdAndDelete({_id:_id});

        if(!order){
            return res.status(400).json({
                message : "Order not cancelled",
                error : true,
                success : false
            });
        }

        return res.status(200).json({
            message : "Order cancelled.",
            success : true,
            error : false,
            data : order
        });


        
    } catch (error) {
       return res.status(400).json({
            message : error.message || error,
            error : true,
            success : false
        });
        
    }
}


module.exports = cancelOrder;