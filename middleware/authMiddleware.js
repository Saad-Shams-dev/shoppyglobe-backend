// Import jsonwebtoken package
const jwt = require("jsonwebtoken");

// Authentication middleware
const auth = (req, res, next) => {

    // Get authorization header from request
    const authHeader = req.header("Authorization");

    // Check if token is available
    if (!authHeader) {
        return res.status(401).json({
            message: "No token, access denied"
        });
    }

    try {

        // Extract token from "Bearer token"
        const token = authHeader.split(" ")[1];

        // Verify JWT token using secret key
        const verified = jwt.verify(token, process.env.JWT_SECRET);

        // Store verified user data in request
        req.user = verified;

        // Move to next middleware or route
        next();

    } catch (err) {

        // Invalid token error
        res.status(400).json({
            message: "Invalid Token"
        });
    }
};

// Export middleware
module.exports = auth;