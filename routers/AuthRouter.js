import express from "express"
import {Register, Login, Logout} from "../controllers/AuthController.js"
const AuthRouter = express.Router();

AuthRouter.post('/register', Register);
AuthRouter.post('/login', Login);
AuthRouter.post("/logout", Logout);

export default AuthRouter;