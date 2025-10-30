import mongoose from 'mongoose'

const cartProductsSchema = new mongoose.Schema(
    {
        customer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Auth',
            required: true,
        },
        orderItems : [
            {
                productId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Product',
                    required: true,
                },
                quantity: {
                    type: Number,
                    required: true,
                    default: 1,
                },
            }
        ],
    }
);
const Cart = mongoose.model('Cart', cartProductsSchema)
export default Cart;