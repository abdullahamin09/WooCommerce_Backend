import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true, 
        },
        price: {
            type: Number,
            required: true,
        },
        discountPrice: {
            type: Number,
        },
        description: {
            type: String,
            required: true,
        },
        Image: {
            url: { type: String, required: true }, // Cloudinary URL
            public_id: { type: String, required: true }, // Cloudinary public_id
    },

    },
    { timestamp: true}
)

const Product = mongoose.model('Product', productSchema);

export default Product; 