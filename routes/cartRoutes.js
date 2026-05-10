const express = require("express");

const Cart = require("../models/Cart");
const Product = require("../models/Product");

const auth = require("../middleware/authMiddleware");

const router = express.Router();

// Add To Cart
router.post("/", auth, async (req, res) => {
    try {
        const { productId, quantity } = req.body;

        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        const cartItem = new Cart({
            productId,
            quantity
        });

        await cartItem.save();

        res.json({
            message: "Product added to cart"
        });

    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
});

// Update Cart
router.put("/:id", auth, async (req, res) => {
    try {
        const updatedCart = await Cart.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json(updatedCart);

    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
});

// Delete Cart Item
router.delete("/:id", auth, async (req, res) => {
    try {
        await Cart.findByIdAndDelete(req.params.id);

        res.json({
            message: "Item removed from cart"
        });

    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
});

module.exports = router;