const uploadProductPermission = require("../../helpers/permission");
const Order = require("../../models/order.model");

const getOrder = async (req, res) => {

    try {

        const sessionUserId = req.userId

        const { id } = req.body;




        const order = await Order.find({ _id: id }).populate({ path: "user", select: "-password" }).populate('orderItems.productId');
        if (!order) {
            return res.status(400).json({
                message: "Order not fetched",
                error: true,
                success: false
            });
        }

        return res.status(200).json({
            message: "Order found.",
            success: true,
            error: false,
            data: order
        });



    } catch (error) {
        return res.status(400).json({
            message: error.message || error,
            error: true,
            success: false
        });

    }
}


module.exports = getOrder;