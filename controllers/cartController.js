import Cart from '../models/cartModel.js';

export const addToCart = async (req, res) => {
    try{
        const userId = req.user._id;
        const {productId, quantity} = req.body;
        let cart = await Cart.findOne({customer: userId});

        if(!cart){
            cart = new Cart({
                customer: userId,
                orderItems: [{productId, quantity}],
            });
        }
        else{
            const existingItem = cart.orderItems.find(
                (items) => items.productId.toString() === productId
            );
            if(existingItem){
                existingItem.quantity += quantity;
            }
            else{
                cart.orderItems.push({productId, quantity});
            }
            const savedCart = await cart.save();
            res.status(200).json({
                message: 'Product added to cart',
                data: savedCart,
            });
        }
    }catch(error){
        console.error("Add to cart error:", error);
        res.status(500).json({ message: error.message });
    }
};

export const getUsersCart = async (req, res) => {
    try {
        const userId = req.user._id;
        const cart = await Cart.findOne({customer: userId}).populate({
            path: 'orderItems.productId',
            // select: 'name price image', // whatever fields you need like dont need description etc
        });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        res.status(200).json({
            message: 'User cart fetched successfully',
            data: cart,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateQuantity = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId, quantity } = req.body;

    const cart = await Cart.findOne({ customer: userId });

    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    const item = cart.orderItems.find(
      (item) => item.productId.toString() === productId
    );

    if (!item)
      return res.status(404).json({ message: 'Product not found in cart' });

    item.quantity = quantity;

    await cart.save();

    res.status(200).json({ message: 'Quantity updated', cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const removeFromCart = async (req, res) => {
    try {
        const userId = req.user._id;
        const { productId } = req.params;
        const cart = await Cart.findOne({ customer: userId });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        cart.orderItems = cart.orderItems.filter(
            (items) => items.productId.toString() !== productId
        ); 
        await cart.save();
        res.status(200).json({
            message: 'Product removed from cart successfully',
            data: cart,
        });

    } catch (error) {
         res.status(500).json({ message: error.message });
    }
}