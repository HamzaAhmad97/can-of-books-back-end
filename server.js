'use strict';

require('dotenv').config();
const express = require('express');
const app = express();
const router = express.Router();

const cors = require('cors');
const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');
const mongoose = require('mongoose');
const { request, response } = require('express');

const PORT = process.env.PORT || 3001;
const { Schema } = mongoose;

app.use(cors());
app.use('/', router); // base

const client = jwksClient({
  jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
});


const getKey = (header, callback) => {
  client.getSigningKey(header.kid, function (err, key) {
    const signingKey = key.publicKey || key.rsaPublicKey;
    callback(null, signingKey);
  });
};


router.route('/authorize').get( (req, res) => {
  console.log(req.headers.authorization );
  const token = req.headers.authorization.split(' ')[1];
  jwt.verify(token, getKey, {}, (err, user) => {
    if(err){
      res.send('invalid token');
    }
    res.send(token);
  });
});


mongoose.connect('mongodb://localhost:27017/books', { useNewUrlParser: true, seUnifiedTopology: true });

// defining the schema
const bookSchema = new Schema({
  title: String,
  description: String,
  status: String,
  email: String
});

// defining the book model
const Book = mongoose.model('books', bookSchema);

const connection = mongoose.connection;

// check the connection to the database 
connection.once('open', () => console.log('MongoDB connection established successfully'));

const seedBook = ({title, description, status, email}) => {
  const nBook = new Book({
    title: title,
    description: description,
    status: status,
    email: email
  });
  nBook.save();
}

// store the book
router.route('/saveBook').get((request, response)=> {
  let bookReq = request.query;
  seedBook(bookReq);
  response.send(`The book is saved successfully.`)
});

// get the book
router.route('/books').get((request, response) => {
  Book.find({}, (err, result) => {
    if (err) response.send(err)
    else response.send(result);
  });
});

app.listen(PORT, () => console.log(`listening on ${PORT}`));
