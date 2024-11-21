const addToCartModel = require("../../models/cartProduct");
const Order = require("../../models/order.model");
const userModel = require("../../models/userModel");
const uploadProductPermission = require("../../helpers/permission");

async function deleteUser(req, res) {
  try {
    let deletedUser = "";
    let deletedOrder = "";
    let deletedCart = "";

    if (!uploadProductPermission(req.userId)) {
      throw new Error("Permission denied");
    }

    const { userID, email } = req.body;

    const userExist = await userModel.findOne({$or:[{_id : userID},{email}]});
    const cart = await addToCartModel.findOne({ userId: userID }) || null;
    const order = await Order.findOne({ user: userID }) || null;

    if (!userExist) {
      return res.status(404).json({
        message: "User does not exist",
        success: false,
        error: true,
      });
    }

    if (userExist) {
      deletedUser = await userModel.findOneAndDelete({$or:[{_id : userID},{email}]});

      if (userExist && cart) {
        deletedCart = await addToCartModel.findOneAndDelete({ userId: userID });

        if (userExist && cart && order) {
          deletedOrder = await Order.findOneAndDelete({ user: userID });

          return res.status(200).json({
            message: "User,Cart and Order Data Deleted Successfully",
            success: true,
          error: false,
          data:{deleteUser,deletedCart,deletedOrder}
          });
        } else {
          return res.status(200).json({
            message: "User and Cart Data Deleted Successfully",
            success: true,
            error: false,
            data:{deleteUser,deletedCart}
          });
        }
      } else {
        return res.status(200).json({
          message: "User Deleted Successfully",
          success: true,
          error: false,
          data : deleteUser
        });
      }
    }



  } catch (error) {
    
    return res.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
}

module.exports = deleteUser;
