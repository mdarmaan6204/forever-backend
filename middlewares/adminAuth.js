import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
  try {
   const {token} = req.headers;

    if (!token) return res.status(403).json({ message: "Unauthorized" });

    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);

    if (decoded === process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD)
      next();
    else return res.status(403).json({ message: "Unauthorized" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

export default adminAuth;
