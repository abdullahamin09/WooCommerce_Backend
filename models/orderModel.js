import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema(
    {
        orderPrice:{
            type: Number,
            required: true,
        },
        orderItems: {
            type: [OrderItem],
        },
        quantity: {
            type: Number,
            default: 1,
            required: true,
        }
    },{timestamp : true}
);

const Order = mongoose.model('Order', orderSchema)
export default Order;