const jwt = require('jsonwebtoken');
const User = require('../Model/User');
require('dotenv').config();

const checkUser = async (req, res, next) => {
    const token = req.cookies.jwt;
    if (!token) {
        return res.status(401).json({ status: false, message: 'No token provided' });
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decodedToken.id);
        if (!user) {
            return res.status(401).json({ status: false, message: 'User not found' });
        }
        req.user = user;
        console.log("user req : ",req.user);
        next();
    } catch (err) {
        return res.status(401).json({ status: false, message: 'Token is invalid' });
    }
};

module.exports = { checkUser };
