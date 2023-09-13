const mongoose = require('mongoose');
const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    roles: {
        User: Number,
        Teacher: Number,
        Admin: Number,
        Architect: Number
    }, 
    password: {
        type: String,
        required: true
    },
    refreshToken: String
});

module.exports = mongoose.model('User', userSchema);