import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

const authUser = async (req, res, next) => {
  const token = req.headers.token;

  if (!token) {
    return res.json({
      success: false,
      message: "Not Authorized. Login Again.",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded.id).select("-password");

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    req.user = user;

    next();
  } catch (error) {
    console.log(`[Auth ❌] Middleware error: ${error.message}`);
    res.json({ success: false, message: "Token invalid or expired" });
  }
};

export default authUser;
