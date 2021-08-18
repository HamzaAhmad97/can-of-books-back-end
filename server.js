'use strict';

// configs
require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3001;
const bodyParser = require('body-parser');

//use
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

//own modules
const addBook = require('./controllers/addBook');
const deleteBook = require('./controllers/deleteBook');
const profileAuthfunc = require('./controllers/profileAuthfunc');
const getBooks = require('./controllers/getBooks');
const testFunc = require('./controllers/testFunc');
const updateBook = require('./controllers/updateBook');

// start mongodb & mongoose
mongoose.connect('mongodb://localhost:27017/books', { useNewUrlParser: true, seUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => console.log('MongoDB connection established successfully'));

//endpoints
app.post('/books', addBook);
app.get('/authorize',profileAuthfunc);
app.get('/books',getBooks);
app.get('/',testFunc);
app.delete('/books/:id', deleteBook);
app.put('/books/:id', updateBook);

//start server at port
app.listen(PORT, () => console.log(`listening on ${PORT}`));

