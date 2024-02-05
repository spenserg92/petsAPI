const mongoose = require('mongoose')

// toy is a subdoc not a model
// toys will exist as a part of a pet's toys array
// each toy will belong to one pet, that's it
// one to many (pet -|--< toy)

const toySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        
    },
    isSqueaky: {
        type: Boolean,
        required: true,
        default: false,
    },
    condition: {
        type: String,
        required: true,
        enum: ['new', 'used', 'disgusting'],
        default: 'new'
    }
}, {timestamps: true})

module.exports = toySchema