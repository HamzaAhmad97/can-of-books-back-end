const mongoose = require('mongoose');
const bookSchema = require('../models/bookSchema');
const Book = mongoose.model('books', bookSchema);

const deleteBook = (req, res) => {

  Book.findByIdAndRemove(req.params.id, (err) => {
    if(err){
        res.send("err");
    } else {
        res.send(req.params.id);
    }
 });
};

module.exports = deleteBook;