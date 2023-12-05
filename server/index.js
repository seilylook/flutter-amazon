// IMPORT FROM PACKAGES
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const DB_URI = process.env.PUBLIC_DATABASE_URI;

// IMPORT FROM OTHER ROUTES || FILES
const authRouter = require('./routes/auth');
const adminRouter = require('./routes/admin');

// INIT SETTING
const PORT = 3000;
const app = express();

// middleware
// Client side (flutter) -> Server side(Nodejs) -> Client side
app.use(express.json());
app.use(authRouter);
app.use(adminRouter)

// Database connection
mongoose
    .connect(DB_URI)
    .then(() => {
        console.log('Connection Success')
    }).catch(e => {
        console.error(e)
    });

app.listen(PORT, "125.130.214.57", () => {
    console.log(`The Server is running on PORT = ${PORT}`);
})