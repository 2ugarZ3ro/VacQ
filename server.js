const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

//Load env vars
dotenv.config({path:'./config/config.env'});

//Connect to database
connectDB();

const app = express();

//add body parser
app.use(express.json());

//Route files
const hospitals = require('./routes/hospitals');
const { connect } = require('mongoose');

//Mount routers
app.use('/api/v1/hospitals', hospitals);

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, console.log('Server running in ', process.env.NODE_ENV, ' mode on port ', PORT));

//Handle unhandled promise rejection
process.on('unhandledRejection', (err, promise) =>{
    console.log(`Error: ${err.message}`);
    //Close server & Exit process
    server.close(() => process.exit(1));
});