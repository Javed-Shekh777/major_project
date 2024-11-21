const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
    quantity: {
      type: Number,
      required: true,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
      required: true,
    },
    price: {
      type: Number,
      required: true,
    }
});

const orderSchema = new mongoose.Schema(
  {
    totalPrice: {
      type: Number,
      required: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    orderItems:  [orderItemSchema],
    billingAddress: {
      type: String,
      required: true,
    },
    shippingAddress: {
      type: String,
      required: true,
      default: "Aadampur Tarabganj Gonda",
    },
    orderId: {
      type: String,
      required: true,
    },
    paymentId: {
      type: String,
      required: true,
    },
    orderStatus: {
      type: String,
      enum: ["PENDING", "CANCELLED", "SHIPPED", "DELIVERED"],
      default: "PENDING",
    },
    paymentStatus: {
      type: String,
      default: "PENDING",
      enum: ["PENDING", "FAILED", "PAID"]
    },
    transactionId: {
      type: String,
      default: ""
    },
    paymentMethod: {
      type: String,
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
