const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    user_image: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        require: true
    },
    city: {
        type: String,
        require: true
    }
});

const User = mongoose.model('User', userSchema, "User");
module.exports = User;