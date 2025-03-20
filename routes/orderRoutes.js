import express from "express";
import adminAuth from "../middlewares/adminAuth.js";
import authUser from "../middlewares/auth.js";
import {
  placeOrder,
  placeOrderStripe,
  placeOrderRazorpay,
  getAllOrders,
  getUserOrders,
  updateOrderStatus,
} from "../controllers/orderController.js";

const orderRouter = express.Router();

// Admin
orderRouter.get("/list", adminAuth, getAllOrders);
orderRouter.patch("/status", adminAuth, updateOrderStatus);

// Payment
orderRouter.post("/placeorder/cod", authUser, placeOrder);
orderRouter.post("/placeorder/stripe", authUser, placeOrderStripe);
orderRouter.post("/placeorder/razorpay", authUser, placeOrderRazorpay);

// User
orderRouter.get("/myorders", authUser, getUserOrders);


export default orderRouter;