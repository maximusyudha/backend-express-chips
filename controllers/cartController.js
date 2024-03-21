const Cart = require("../models/Cart");

exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.userData.userId;

    const cartItem = await Cart.findOne({ userId, productId });

    if (cartItem) {
      cartItem.quantity += quantity;
      await cartItem.save();
    } else {
      await Cart.create({ userId, productId, quantity });
    }

    res.status(200).json({ message: "Item added to cart successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getCartItems = async (req, res) => {
  try {
    const userId = req.userData.userId;
    const cartItems = await Cart.find({ userId, deleted: false }).populate(
      "productId"
    );

    res.status(200).json({ cartItems });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};


exports.removeFromCart = async (req, res) => {
  try {
    const userId = req.userData.userId;
    const productId = req.params.productId;

    // Menandai item sebagai "deleted" daripada menghapus secara permanen
    const result = await Cart.updateOne(
      { userId, productId },
      { deleted: true }
    );

    // Memeriksa apakah item berhasil ditandai sebagai "deleted"
    if (result.nModified === 0) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    res.status(200).json({ message: "Item removed from cart successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


