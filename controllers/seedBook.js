const mongoose = require('mongoose');
const bookSchema = require('../models/bookSchema');
const Book = mongoose.model('books', bookSchema);
const seedBook = ({title, desc, email}) => {
     const nBook = new Book({
       title: title,
       desc: desc,
       email: email
     });
     nBook.save();
   }
   module.exports = seedBook;