import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  subCategory: {
    type: String,
    required: true,
  },
  image: {
    type: Array,
    required: true,
  },
  sizes: {
    type: Array,
    required: true,
  },
  bestSeller: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Number,
    required: true,
  },
});

const productModel =
  mongoose.models.product || mongoose.model("Product", productSchema);

export default productModel;
