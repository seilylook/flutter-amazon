const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        require: true,
        type: String,
        trim: true,
    }
})