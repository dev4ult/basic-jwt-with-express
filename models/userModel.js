const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({});

module.exports = mongoose.model('users', userSchema, 'users');
