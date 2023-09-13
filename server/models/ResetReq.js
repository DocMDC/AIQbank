const mongoose = require('mongoose');
const Schema = mongoose.Schema

const resetReq = new Schema({
    uniqueId: String,
    email: String
});

module.exports = mongoose.model('ResetReq', resetReq);