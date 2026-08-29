const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    gender: {
        type: String,
        required: true,
        enum: ['Male', 'Female', 'Other']
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    image: {
        type: String,
    }, 
    role: {
        type: String,
        enum: ['User', 'Admin'],
        default: 'User',
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },

},
    {
        timestamps: true,

    })

module.exports = mongoose.model('User', userSchema)