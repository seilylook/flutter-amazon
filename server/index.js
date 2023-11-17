// IMPORT FROM PACKAGES
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const DB_URI = process.env.PUBLIC_DATABASE_URI;

// IMPORT FROM OTHER ROUTES || FILES
const authRouter = require('./routes/auth');

// INIT SETTING
const PORT = 3000;
const app = express();

// middleware
// Client side (flutter) -> Server side(Nodejs) -> Client side
app.use(authRouter);

// Database connection
mongoose
    .connect(DB_URI)
    .then(() => {
        console.log('Connection Success')
    }).catch(e => {
        console.error(e)
    });

app.listen(PORT, () => {
    console.log(`The Server is running on PORT = ${PORT}`);
})