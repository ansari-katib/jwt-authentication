const jwt = require("jsonwebtoken");
const User = require("../Model/User");
const bcrypt = require('bcrypt');
require('dotenv').config();

const maxAge = 30 * 1000;

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: maxAge });
}


const handleSignup = async (request, response) => {
    try {
        const { email, password } = request.body;

        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(password, salt);

        const user = await User.create({ email, password: hashPassword });
        const token = createToken(user.id);

        response.cookie("jwt", token, {
            withCredentials: true,
            httpOnly: false,
            maxAge: maxAge,
        });

        response.status(200).json({ user: user.id, created: true });
    } catch (errors) {
        console.log("something went wrong : ", errors.message);
        response.status(500).send('internal server error ');
    }
}

const handleLogin = async (request, response) => {
    try {
        const { email, password } = request.body;

        const user = await User.login(email, password);
        const token = createToken(user.id);

        response.cookie("jwt", token, {
            withCredentials: true,
            httpOnly: false,
            maxAge: maxAge,
        });

        response.status(200).json({ user: user.id, status: true });
    } catch (errors) {
        console.log("something went wrong : ", errors.message);
        response.status(500).send('internal server error ');
        response.json({ status: false });
    }
}

const handleProtected = async (request, response) => {
    try {
        const user  = request.user;
        response.status(200).json({
            status: true,
            message: "you are authorized",
            user: { id: user.id, email: user.email },
        });
    } catch (errors) {
        console.log("something went wrong : ", errors.message);
        response.status(500).json({ status: false, message: 'internal server error ' });
    }
}

module.exports = {
    handleSignup,
    handleLogin,
    handleProtected
}
