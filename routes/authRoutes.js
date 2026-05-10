// Import required packages
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Import User model
const User = require("../models/User");

// Create router
const router = express.Router();


// ================= REGISTER USER =================
router.post("/register", async (req, res) => {
    try {

        // Get email and password from request body
        const { email, password } = req.body;

        // Hash password for security
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const user = new User({
            email,
            password: hashedPassword
        });

        // Save user in database
        await user.save();

        // Success response
        res.json({
            message: "User Registered Successfully"
        });

    } catch (err) {

        // Error response
        res.status(500).json({
            error: err.message
        });
    }
});


// ================= LOGIN USER =================
router.post("/login", async (req, res) => {
    try {

        // Get email and password from request body
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email });

        // Check if user exists
        if (!user) {
            return res.status(400).json({
                message: "User not found"
            });
        }

        // Compare entered password with hashed password
        const isMatch = await bcrypt.compare(password, user.password);

        // Check if password is correct
        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid credentials"
            });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET
        );

        // Send token in response
        res.json({
            token
        });

    } catch (err) {

        // Error response
        res.status(500).json({
            error: err.message
        });
    }
});

// Export router
module.exports = router;