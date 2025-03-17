import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
  try {
    const token = req.header("token");

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Please authenticate" });
    }

    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = token_decode.id;
    next();
  } catch (e) {
    console.log(e);
    res.status(401).json({ success: false, message: "Please authenticate" });
  }
};

export default authUser;
