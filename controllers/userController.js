import validator from "validator";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const genToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};
// Route for login User

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.json({ success: false, message: "Please enter all fields" });
    }

    const user = await userModel.findOne({ email });

    // checking user existance
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Checking for password
    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = genToken(user._id);
      res.send({ success: true, user, token });
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Credentials" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// Route for register User
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.json({ success: false, message: "Please enter all fields" });
    }
    const existingUser = await userModel.findOne({ email });

    // Checking for already exisiting user
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    //  checking for strong pasword
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password should be atleast 6 characters",
      });
    }

    // Checking for valid email
    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Please enter valid email" });
    }

    // Encrypting the password

    const salt = await bcrypt.genSalt(10);
    const hasedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name,
      email,
      password: hasedPassword,
    });

    const user = await newUser.save();

    // Generating token
    const token = genToken(user._id);
    res.send({ success: true, user, token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// Route for admin Login

const adminLogin = async (req, res) => {
  try {
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

export { loginUser, registerUser, adminLogin };
