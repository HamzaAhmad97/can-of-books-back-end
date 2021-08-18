
const mongoose = require('mongoose');
const bookSchema = require('../models/bookSchema');
const Book = mongoose.model('books', bookSchema);
const getBooks = require('./getBooks');

const updateBook = (request, response) => {
  let id = request.params.id;
  let body = request.body;
  Book.findByIdAndUpdate({_id : id}, {title: request.body.title, desc: request.body.desc, status: request.body.status}, (err, result) => {
    if (err) {
      response.send(err);
    } else {
      getBooks(request, response);
    }
  })
}
module.exports = updateBook;