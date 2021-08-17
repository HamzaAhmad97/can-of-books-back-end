
const mongoose = require('mongoose');
const bookSchema = require('../models/bookSchema');
const Book = mongoose.model('books', bookSchema);


const getBooks = (request, response) => {
  Book.find({}, (err, result) => {
    if (err) response.send(err)
    else {
      console.log(result);
      response.send(result);
    }
  });
}
module.exports = getBooks;