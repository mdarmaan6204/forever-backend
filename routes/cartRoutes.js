import express from "express";
import {
  addToCart,
  updateCartItems,
  getUserCart,
} from "../controllers/cartController.js";
import authUser from "../middlewares/auth.js";

const cartRouter = express.Router();

cartRouter.get("/get", authUser, getUserCart);
cartRouter.post("/add", authUser, addToCart);
cartRouter.put("/update", authUser, updateCartItems);

export default cartRouter;
