const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        require: true,
        unique: true
    },
    username: {
        type: String, 
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minLength: [5, 'Password Must Be At Least 5 Characters Long']
    }
})

module.exports = mongoose.model('User', UserSchema)