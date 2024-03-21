const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const cartController = require("../controllers/cartController");

router.post("/add-to-cart", authMiddleware, cartController.addToCart);
router.get("/my-cart", authMiddleware, cartController.getCartItems);
router.delete(
  "/remove-from-cart/:cartItemId",
  authMiddleware,
  cartController.removeFromCart
);

module.exports = router;
