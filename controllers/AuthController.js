import Auth from "../models/AuthModel.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"


const JWT_SECRET = process.env.JWT_SECRET || "this_is_secret_code";

export const Register = async(req, res) => {
    try{
        console.log("Incoming Auth request body:", req.body);
        const {name, email, password} = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }
        const existingUser = await Auth.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "User Already Existed" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        // const newAuth = new Auth({ name, email, password });
        // await newAuth.save();
        const newAuth = await Auth.create({name, email, password: hashedPassword });

        res.status(201).json({
            message : 'User Resgistered',
            data : newAuth,
        });
    }catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ error: "Internal server eerr", details: error.message });
    }
};

export const Login = async (req, res) => {
  try {
    console.log("Incoming Login request:", req.body);

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const user = await Auth.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

     const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            return res.status(400).json({ error: "Invalid credentials" }); 

    const token = jwt.sign(
            { id: user._id, email: user.email },
            JWT_SECRET,
            { expiresIn: "1d" }
        );

        res
        .status(200)
        .header('Authorization', `bearer ${token}`)
        .cookie("token", token, {
      httpOnly: true,
      secure: false, // set true if using HTTPS
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });
    


        res.status(200).json({
            message: "Login successful",
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const Logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: false, // true in production
    sameSite: "strict",
  });
  res.json({ success: true, message: "Logged out successfully" });
};
