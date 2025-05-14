const express = require('express');
const { handleSignup, handleLogin, handleProtected } = require('../Controllers/AuthController.js');
const { checkUser } = require('../Middleware/AuthMiddleware.js');

const authRoute = express.Router();

authRoute.post('/signup', handleSignup);
authRoute.post('/login', handleLogin);

// protected route
authRoute.get('/protected', checkUser, handleProtected);

module.exports = authRoute;