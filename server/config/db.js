const mongoose = require('mongoose');
require('dotenv').config();

module.exports.connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log('connected to DB successfully');
    })
    .catch((error) => {
        console.log(`something went wrong while connecting to DB : ${error.message}`);
    })
    } catch (error) {
        console.log(`Internal server error : ${error.message}`);
    }
}

