import express from 'express';
import {addToCart, getUsersCart, removeFromCart, updateQuantity} from '../controllers/cartController.js'
import { verifyToken } from '../middlewares/AuthMiddleware.js';

const cartRouter = express.Router();

cartRouter.post('/', verifyToken, addToCart);
cartRouter.get('/', verifyToken, getUsersCart);
cartRouter.patch('/update', verifyToken, updateQuantity);
cartRouter.delete('/remove/:productId', verifyToken, removeFromCart);

export default cartRouter;