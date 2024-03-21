const Product = require('../models/Product');

// Create Product
exports.createProduct = async (req, res) => {
    try {
        const {id, image, title, price, description,stocks, chooseItem } = req.body;
        const product = new Product({id, image, title, price, description,stocks, chooseItem });
        if(req.file){
            product.image = req.file.path
        }
        await product.save();
        res.status(201).json({ message: 'Product created successfully', product});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get All Products
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get Product by ID
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update Product
exports.updateProduct = async (req, res) => {
    try {
        const {id, title, price, description, stocks, chooseItem } = req.body;
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {id, title, price, description, stocks, chooseItem }, { new: true });
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product updated successfully', product: updatedProduct });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete Product
exports.deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
