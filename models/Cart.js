// Import mongoose package
const mongoose = require("mongoose");

// Create cart schema
const cartSchema = new mongoose.Schema({

    // Store product ID from Product collection
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    },

    // Store quantity of product added to cart
    quantity: Number
});

// Export Cart model
module.exports = mongoose.model("Cart", cartSchema);