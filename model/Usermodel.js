const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    lastname: {
        type: String,

    },
    phone: {
        type: Number,

    },
    currentAddress: {
        type: String,

    },
    birthDate: {
        type: Date,

    },
    email: {
        type: String,
        unique: true,
        required: true

    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: Number,
        default: 0
    },
    isActive: {
        type: Boolean,
        default: false
    },
    activitionCode: {
        type: String
    },


});
module.exports = mongoose.model('User', userSchema);