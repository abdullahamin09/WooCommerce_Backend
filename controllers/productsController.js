import Product from "../models/productModel.js";
import cloudinary from "../config/cloudinary.js";

// CREATE PRODUCT
export const createProduct = async (req, res) => {
  let uploadedImage = null; // To track uploaded image in case rollback needed
  try {
    console.log("Incoming request body:", req.body);

    const { title, price, description, discountPrice } = req.body;
    const image = req.file ? req.file.path : null; // Cloudinary URL
    const public_id = req.file ? req.file.filename : null; // Cloudinary public_id

    // Validate required fields
    if (!title || !price || !description || !image) {
      if (public_id) await cloudinary.uploader.destroy(public_id); // cleanup if uploaded
      return res.status(400).json({ error: "All fields are required" });
    }

    // Keep reference for rollback
    uploadedImage = { public_id };

    // Save to DB
    const newProduct = await Product.create({
      title,
      price,
      discountPrice: discountPrice || "",
      description,
      Image: {
        url: image,
        public_id,
      },
    });

    res.status(201).json({
      message: "Product created successfully",
      product: newProduct,
    });
    
  } catch (error) {
    console.error("Error creating product:", error);

    // Rollback Cloudinary image if DB fails
    if (uploadedImage?.public_id) {
      try {
        await cloudinary.uploader.destroy(uploadedImage.public_id);
        console.log("Rolled back Cloudinary image:", uploadedImage.public_id);
      } catch (deleteErr) {
        console.error("Error cleaning Cloudinary image:", deleteErr);
      }
    }

    res.status(500).json({ message: error.message });
  }
};

// GET ALL PRODUCTS
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET SINGLE PRODUCT
export const getSingleProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE PRODUCT
export const updateProduct = async (req, res) => {
  let newUpload = null;
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(404).json({ message: "Product not found" });

    let updatedData = {
      title: req.body.title || product.title,
      discountPrice: req.body.discountPrice || product.discountPrice,
      description: req.body.description || product.description,
      price: req.body.price || product.price,
    };

    // If new image uploaded
    if (req.file) {
      newUpload = req.file;

      // Delete old Cloudinary image
      if (product.Image?.public_id) {
        await cloudinary.uploader.destroy(product.Image.public_id);
        console.log("🗑️ Deleted old Cloudinary image:", product.Image.public_id);
      }

      // Update with new Cloudinary image details
      updatedData.Image = {
        url: req.file.path,
        public_id: req.file.filename,
      };
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );

    res.json(updatedProduct);
  } catch (error) {
    console.error("Error updating product:", error);

    // If update fails, rollback new upload (if any)
    if (newUpload?.filename) {
      try {
        await cloudinary.uploader.destroy(newUpload.filename);
        console.log("Rolled back new Cloudinary image:", newUpload.filename);
      } catch (deleteErr) {
        console.error("Error cleaning Cloudinary image:", deleteErr);
      }
    }

    res.status(500).json({ message: error.message });
  }
};

// DELETE PRODUCT
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(404).json({ message: "Product not found" });

    // Delete Cloudinary image
    if (product.Image?.public_id) {
      await cloudinary.uploader.destroy(product.Image.public_id);
      console.log("🗑️ Deleted Cloudinary image:", product.Image.public_id);
    }

    await product.deleteOne();

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ error: error.message });
  }
};
