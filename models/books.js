const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    title: {
        type: String, 
        required: true
    },
    author: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }, 
    image: {
        type: String,
        required: true
    }, 
    link: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        reqiured: true
    },
    bookIDs: {
        type: String,
        required: true
    }
});

// Exports the book schema
module.exports = Books = mongoose.model("Books", bookSchema);