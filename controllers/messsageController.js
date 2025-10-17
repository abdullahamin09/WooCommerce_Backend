import Message from '../models/messageModel.js'

export const create = async(req, res, next) => {
    try{
        console.log("Incoming request body:", req.body);
        const {name, email, message} = req.body;

        if (!name || !email || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }
        const newMessage = await Message.create({name, email, message});
        res.status(201).json(newMessage);
    } catch(error) {
        console.error("Error creating message:", error.message);
        next(error);
    }
};

// Get all
export const find = async(req, res, next) => {
    try{
        const message = await Message.find();
        res.json(message);
    }catch(error){
        next(error);
    }
};

// Get by id
export const findById =  async(req, res, next) => {
    try{
        const message = await Message.findById(req.params.id);
        if(!message){
            return res.status(404).json({message : "Not Found"});
        }
        res.json(message);
    }catch(error){
        next(error);
    }
};

export const findByIdAndUpdate = async(req, res, next) => {
   try{
     const updated = await Message.findByIdAndUpdate(req.params.id, req.body, { new : true });
     if(!updated) return res.status(404).json({message : "Not Found"});
     res.json(updated)
   }catch(error){
    next(error);
   }
};

export const findByIdAndUpdateSingle = async(req, res, next) => {
    try{
        const updated = await Message.findByIdAndUpdate(req.params.id, req.body, { new:true });
        if(!updated) return res.status(404).json({message : "Not Found"});
        res.json(updated)
    }catch(error){
        next(error);
    }
};

export const findOneAndDelete =  async(req, res, next) => {
    try{
        const deleted = await Message.findOneAndDelete(req.params.id);
        if(!deleted) return res.status(404).json({message : "Not Found"});
        res.json({message : "Deletes successfully"})
    }catch(error){
        next(error);
    }
};

