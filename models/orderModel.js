import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
  userId: { type: String, required: true },
  items: { type: Array, required: true },
  address: { type: Object, required: true },
  paymentMethod: { type: String, required: true  , default: "COD" },
  amount: { type: Number, required: true },
  payment: { type: Boolean, required: false, default: false },
  status: { type: String, required: true, default: "Order Placed" },
  date: { type: Number, required: true },
});

const orderModel = mongoose.models.Order || mongoose.model("Order" , orderSchema);

export default orderModel;
