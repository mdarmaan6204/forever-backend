import express from "express";
import {
  removeProduct,
  listProduct,
  singleProduct,
  addProduct,
} from "../controllers/productController.js";
import upload from "../middlewares/multer.js";
import adminAuth from "../middlewares/adminAuth.js";

const productRouter = express.Router();

productRouter.post(
  "/add",
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  adminAuth,
  addProduct
);
productRouter.get("/list", listProduct);
productRouter.get("/single/:id", adminAuth,singleProduct);
productRouter.delete("/remove/:id",adminAuth, removeProduct);

export default productRouter;
