import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";

// Function for removing a product

const removeProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await productModel.findByIdAndDelete(id);

    if (!result) {
      return res
        .status(400)
        .json({ success: false, message: "Product not found" });
    }

    res.json({ success: true, message: "Product removed successfully" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ success: false, message: err.message });
  }
};

// Function for list product

const listProduct = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.json({ success: true, products });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error.message });
  }
};

// Function for single

const singleProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productModel.findById(id);

    if (!product) {
      return res
        .status(400)
        .json({ success: false, message: "Product not found" });
    }
    return res.json({ success: true, product });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error.message });
  }
};

// Function for adding a product

const addProduct = async (req, res) => {
  try {
    const {
      name,
      price,
      description,
      category,
      subCategory,
      sizes,
      bestSeller,
    } = req.body;
    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

    const images = [image1, image2, image3, image4].filter(
      (img) => img != undefined
    );

    // Generating URL of images

    let imageUrls = await Promise.all(
      images.map(async (img) => {
        let res = await cloudinary.uploader.upload(img.path);
        return res.secure_url;
      })
    );

    // Creating new product
    const productData = {
      name,
      price,
      description,
      category,
      subCategory,
      sizes: JSON.parse(sizes),
      bestSeller: bestSeller === "true" ? true : false,
      image: imageUrls,
      date: Date.now(),
    };

    const newProduct = new productModel(productData);
    await newProduct.save();

    res.json({
      success: true,
      message: "Product added successfully",
      productData,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error.message });
  }
};

export { removeProduct, listProduct, singleProduct, addProduct };
