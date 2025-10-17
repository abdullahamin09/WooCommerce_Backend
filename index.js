import express from "express"
import cors from 'cors'
import mongoose from "mongoose"
import bodyParser from "body-parser"
import dotenv from "dotenv"
import Router from "./routers/Routers.js"
import {errorHandler} from "./middlewares/errorMiddleware.js"

const app = express();

dotenv.config();
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());
app.use("/api/message", Router);

app.use(errorHandler);

const PORT = process.env.PORT || 5000
const MONGOURL = process.env.MONGO_URL;
mongoose.connect(MONGOURL).then(() => {
    console.log("Database Connected Successfully");
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);  
    })
})
.catch(err => console.log( 'DB connection failed', err));

