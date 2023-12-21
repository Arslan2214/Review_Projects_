const mongoose = require('mongoose')

const todoSchema = mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    discription: {
        type: String,
    },
    tags: {
        type: [String],
        default: [],
    },
    status: {
        type: Boolean,
        default: false,
    },
    dateCreated: {
        type: Date,
        default: Date.now,
    }
})


module.exports = mongoose.model('Todo', todoSchema)