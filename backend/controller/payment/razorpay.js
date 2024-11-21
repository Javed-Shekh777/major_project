const Razorpay = require("razorpay");
const crypto = require("crypto");
const OrderModel = require("../../models/order.model");
const CartModel = require("../../models/cartProduct");
const uploadProductPermission = require("../../helpers/permission");
 

const deleteOrdersByIds = async () => {
  try {
    const order = await OrderModel.findById("6666a290f27ea04d2642e187");

 

    const productIds = order.orderItems.map((item) => item.productId);
   

    const result = await CartModel.deleteMany({
      productId: { $in: productIds },
    });
 
  } catch (error) {
    console.error("Error deleting orders:", error);
  }
};

const razorpay = new Razorpay({
  key_id: process.env.PAY_ID,
  key_secret: process.env.PAY_SECRET,
});

const saveOrder = async (req, res) => {
  const session = req.userId;

  const { amount, orderItems, address } = req.body;

  try {
    const orderData = await new OrderModel({
      totalPrice: Number(amount),
      user: session,
      orderId: "123",
      paymentId: "123",
      orderItems: orderItems,
      billingAddress: address,
    }).save();

    return res.status(200).json({
      message: "Order Created Successfully",
      error: false,
      success: true,
      data: orderData,
    });
  } catch (error) {
    return res.status(500).send(error);
  }
};

const createOrder = async (req, res) => {
  const { id } = req.body;

   

  try {
    const createdOrder = await OrderModel.findById({ _id: id });
    if (!createdOrder) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "First Order create then do Payment",
      });
    }

    

    const amount = createdOrder.totalPrice * 100;
    const currency = "INR";

    const order = await razorpay.orders.create({ amount, currency });

    

    return res.json({
      success: true,
      error: false,
      data: order,
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

const paymentSuccess = async (req, res) => {
  let successOrder = "";

   
  
  const { check = false,id ,cartId} = req.body;
  // Verify the payment signature to ensure it is from Razorpay
  const crypto = require("crypto");
  const shasum = crypto.createHmac("sha256", process.env.PAY_SECRET);

 

  const payment = await razorpay.payments.fetch(req.body.razorpayPaymentId);

  // Extract payment method type
  const paymentMethodType = payment.method; // e.g., card, netbanking, wallet, upi, etc.

   

  shasum.update(`${req.body.orderCreationId}|${req.body.razorpayPaymentId}`);
  

  const digest = shasum.digest("hex");
 

  if (digest !== req.body.razorpaySignature) {
    return res.status(400).json({
      error: true,
      success: false,
      message: "Transaction not legit!",
    });
  }

  successOrder = await OrderModel.findByIdAndUpdate(
    { _id : id },
    {
      $set: {
        orderId: req.body.orderCreationId  ,
        paymentStatus: "PAID",
        paymentId: req.body.razorpayPaymentId || "no id",
        paymentMethod: payment.method,
      },
    },
    {
      new: true,
    }
  );

  if(successOrder){
    await CartModel.findByIdAndDelete({_id:cartId});
  }

 
  if (!successOrder || check != false ) {
    successOrder = await OrderModel.findByIdAndUpdate(
    { _id : id },
      {
        $set: {
          orderId: req.body.orderCreationId,
          paymentStatus: "FAILED",
          paymentId: req.body.razorpayPaymentId || "no id",
        },
      },
      {
        new: true,
      }
    );

    return res.json({
      message: "Transaction Failed",
      error: true,
      success: false,
      data: "",
    });
  }

  return res.json({
    message: "Payment Successful",
    success: true,
    error: false,
    data: successOrder,
  });
};

const changeStatus = async (req, res) => {
  const sessionUserId = req.userId;
  let successOrder;


  try {
    if (!uploadProductPermission(sessionUserId)) {
      throw new Error("Permission denied");
    }

    const { pstatus, id,ostatus } = req.body;

    if (!ostatus && !pstatus) {
      return res.status(400).json({
        error: true,
        success: false,
        message: "Please select any status!!",
      });
    }


    const findOrder = await OrderModel.findById({_id  : id});

    successOrder = await OrderModel.findByIdAndUpdate(
      { _id : id },
      {
        $set: {
          paymentStatus: pstatus || findOrder.paymentStatus,
          orderStatus : ostatus || findOrder.orderStatus,
        },
      },
      {
        new: true,
      }
    );

    if (!successOrder) {
      return res.status(400).json({
        error: true,
        success: false,
        message: "Status not Updated!!",
      });
    }

    return res.status(200).json({
      data: successOrder,
      message: "Status Updated Successfully!!",
      success: true,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      error: true,
      success: false,
      message: error.message || error,
    });
  }
};

module.exports = { createOrder, paymentSuccess, saveOrder, changeStatus };
