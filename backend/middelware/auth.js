const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");

const isAuthenticated = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        if (!token) {
            return res.status(401).json({
                message: "Please Login to access Resource"
            });
        }
        const decodedData = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = await User.findById(decodedData.id).select("-password");
        next();
    } catch (error) {
        res.status(400).json({
            error
        })
    }
}

module.exports = { isAuthenticated }