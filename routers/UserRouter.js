import express from "express";
import { verifyToken } from "../middlewares/AuthMiddleware.js";
import Auth from "../models/AuthModel.js";

const UserRouter = express.Router();

// 🧩 Protected Route
UserRouter.get("/profile", verifyToken, async (req, res) => {
  try {
    const user = await Auth.findById(req.user.id).select("-password"); // hide password
    if (!user) return res.status(404).json({ error: "User not found" });

    res.json({ message: "Profile fetched successfully", user });
  } catch (error) {
    console.error("Profile fetch error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default UserRouter;
