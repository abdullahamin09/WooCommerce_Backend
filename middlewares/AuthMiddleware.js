import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  try {
    // ✅ Get token from cookie or header
    const token = req.cookies?.token || req.headers["authorization"]?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Access Denied: No Token Provided" });
    }

    // ✅ Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // store user info in request

    next(); // continue to the next middleware or route
  } catch (error) {
    return res.status(403).json({ message: "Invalid or Expired Token" });
  }
};