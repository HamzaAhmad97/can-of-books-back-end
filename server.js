'use strict';

require('dotenv').config();
const express = require('express');
const app = express();
const router = express.Router();
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3001;
app.use(cors());

app.use('/', router); 
const profileAuthfunc = require('./controllers/profileAuthfunc');
const getBooks = require('./controllers/getBooks');
const testFunc = require('./controllers/testFunc');



mongoose.connect('mongodb://localhost:27017/books', { useNewUrlParser: true, seUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => console.log('MongoDB connection established successfully'));

router.route('/authorize').get(profileAuthfunc);

router.route('/books').get(getBooks);

router.route('/').get(testFunc);

app.listen(PORT, () => console.log(`listening on ${PORT}`));



// // defining the schema
// const bookSchema = new Schema({
//   title: String,
//   description: String,
//   status: String,
//   email: String
// });

// defining the book model
///////////////////////////////////

// const seedBook = ({title, description, status, email}) => {
//   const nBook = new Book({
//     title: title,
//     description: description,
//     status: status,
//     email: email
//   });
//   nBook.save();
// }