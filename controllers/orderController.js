import Order from "../models/orderModel.js";
import userModel from "../models/userModel.js";

// Placing order via COD method
const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;
    if(!userId){
      return res.status(400).json({ success: false, message: "User not found" });
    }
    else if(!items || items.length === 0){
      return res.status(400).json({ success: false, message: "Cart is empty" });
    }
    else if(!address){
      return res.status(400).json({ success: false, message: "Address is required" });
    }
    

    const newOrder = new Order({
      userId,
      items,
      amount,
      address,
      paymentMethod: "cod",
      date: new Date(),
    });

    const savedOrder = await newOrder.save();
    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    res
      .status(201)
      .json({ success: true, message: "Order placed successfully" });
  } catch (error) {
    console.log(console.error);
    res.status(500).json({ message: error.message });
  }
};

// Placing order via Stripe method
const placeOrderStripe = async (req, res) => {};

// Placing order via Razorpay method
const placeOrderRazorpay = async (req, res) => {};

// Get all order detailes in admin panel
const getAllOrders = async (req, res) => {};

// Get Order data for  a user
const getUserOrders = async (req, res) => {};

// Update order status from Admin panel
const updateOrderStatus = async (req, res) => {};

export {
  placeOrder,
  placeOrderStripe,
  placeOrderRazorpay,
  getAllOrders,
  getUserOrders,
  updateOrderStatus,
};
