import mongoose from "mongoose"

const messageSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter your name"]
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        message: {
            type: String,
            required: true
        }
    },{timestamp : true}
)
const Message = mongoose.model('Message', messageSchema);

export default Message;