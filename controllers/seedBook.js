const mongoose = require('mongoose');
const bookSchema = require('../models/bookSchema');
const Book = mongoose.model('books', bookSchema);
const seedBook = ({title, desc, email, status}) => {
     const nBook = new Book({
       title: title,
       desc: desc,
       email: email,
       status: status,
     });
     nBook.save();
   }
   module.exports = seedBook;