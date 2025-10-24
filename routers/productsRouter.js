import express from 'express';
import { createProduct, getProducts, getSingleProduct, updateProduct, deleteProduct } from '../controllers/productsController.js';
import upload from '../middlewares/multer.middleware.js';

const productRouter = express.Router();

productRouter.post('/',upload.single('image') , createProduct);
productRouter.get('/', getProducts);
productRouter.get('/:id', getSingleProduct);
productRouter.put('/:id', upload.single("image"), updateProduct);
productRouter.delete('/:id', deleteProduct);

export default productRouter;