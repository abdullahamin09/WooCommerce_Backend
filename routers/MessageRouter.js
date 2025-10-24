import express from 'express'
import { create, find, findById, findByIdAndUpdate, findByIdAndUpdateSingle, findOneAndDelete } from "../controllers/messsageController.js";

const MessageRouter = express.Router();

MessageRouter.post('/', create);

MessageRouter.get("/" , find);

MessageRouter.get("/:id" , findById);

MessageRouter.put('/:id', findByIdAndUpdate);

MessageRouter.patch('/:id', findByIdAndUpdateSingle);

MessageRouter.delete('/:id', findOneAndDelete);

export default MessageRouter;