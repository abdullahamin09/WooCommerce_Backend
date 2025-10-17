import express from 'express'
import { create, find, findById, findByIdAndUpdate, findByIdAndUpdateSingle, findOneAndDelete } from "../controllers/messsageController.js";

const router = express.Router();

router.post('/', create);

router.get("/" , find);

router.get("/:id" , findById);

router.put('/:id', findByIdAndUpdate);

router.patch('/:id', findByIdAndUpdateSingle);

router.delete('/:id', findOneAndDelete);

export default router;