const Validator = require("validator");
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [Validator.isEmail, 'Please use a valid email address']
    },
    friend: {
        type: String
    }
}, {
    timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User; 