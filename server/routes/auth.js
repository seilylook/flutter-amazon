const express = require('express');

const authRouter = express.Router();

authRouter.post('/api/signup', (req, res) => {
    // get the data from client
    // name, email, password
    // post data to the database
    // return the data to the client
    const { name, email, password } = req.body;

})

module.exports = authRouter;