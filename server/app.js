const express = require('express');
const { connectDB } = require('./config/db.js');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRoute = require('./Routes/AuthRoute.js');
require('dotenv').config();

connectDB();

const app = express();
const Port  = process.env.PORT || 8080 ;


app.use(cors({
    origin:"http://localhost:5173",
    methods:["GET" , "POST"],
    credentials:true
}));
app.use(express.json());
app.use(cookieParser());

app.get('/' , (request, response) => {
   response.send('server is working fine :) ');  
})

app.use('/auth' , authRoute);

app.listen(Port , () => {
    console.log(`\nserver is running on http://localhost:${Port}`)
})