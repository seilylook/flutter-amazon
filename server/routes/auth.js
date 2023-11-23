const express = require('express');
const User = require('../models/user');
const bcryptjs = require('bcryptjs');
const authRouter = express.Router();
const jwt = require('jsonwebtoken');

// SIGN UP
authRouter.post('/api/signup', async (req, res) => {
    // get the data from client
    // name, email, password
    // post data to the database
    // return the data to the client
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ msg: 'User with same email already exist.' })
        }

        const hashedPassword = await bcryptjs.hash(password, 8);

        let user = new User({
            email,
            password: hashedPassword,
            name,
        })

        user = await user.save();

        res.json(user)
    } catch (e) {
        return res.status(500).json({ error: e.message })
    }

    // ----- Success Data-----
    // {
    //     "name": "kim",
    //     "email": "kim@kim.com",
    //     "password": "$2a$08$rjsyoq1L5Hc98JGWORzx/OXj6P2DSm2ydVV1TfZ7zSjnGd02Rwppi",
    //     "address": "",
    //     "type": "user",
    //     "_id": "655b3877bd493e7d61b5c313",
    //     "__v": 0
    // }
})

// SIGN IN
authRouter.post('/api/signin', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ msg: 'User with this email does not exist!' })
        }

        const isMatch = await bcryptjs.compare(password, user.password)

        if (!isMatch) {
            return res.status(400).json({ msg: 'The password is not correct!' })
        }
        const token = jwt.sign({ id: user._id }, 'passwordKey');
        res.json({ token, ...user._doc })
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
})

module.exports = authRouter;