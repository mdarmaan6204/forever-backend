import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongoose.js";
import connectCloudinary from "./config/cloudinary.js";

// App config
const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();

// Middlewares
app.use(express.json());
app.use(cors());

// API Endpoints
app.get("/", (req, res) => {
  res.send("API Working..");
});

// Listen
app.listen(port, () => console.log(`Server is running on port ${port}`));
