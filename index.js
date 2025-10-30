import express from "express"
import connectDB from "./config/db.js"
import cors from 'cors'
import bodyParser from "body-parser"
import dotenv from "dotenv"
import { errorHandler } from "./middlewares/errorMiddleware.js"
import MessageRouter from "./routers/MessageRouter.js"
import AuthRouter from "./routers/AuthRouter.js"
import cookieParser from "cookie-parser";
import UserProtectedRouter from "./routers/UserProtectedRouter.js"
import productRouter from "./routers/productsRouter.js"
import cartRoutes from './routers/cartRouter.js';



const app = express();

dotenv.config();
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
app.use(errorHandler);

app.use("/api/auth", AuthRouter);
app.use("/api/message", MessageRouter);
app.use("/api", UserProtectedRouter);
app.get("/profile", (req, res) => {
  res.send("Server is running...");
});
app.use("/api/products", productRouter);
app.use('/api/cart', cartRoutes);

connectDB();
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);  
    })

