import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config();

const connectDB = () => {
    const PORT = process.env.PORT || 5000
    const MONGOURL = process.env.MONGO_URL;

    mongoose.connect(MONGOURL).then(() => {
    console.log("Database Connected Successfully");
})
.catch(err => console.log( 'DB connection failed', err));
}
export default connectDB;