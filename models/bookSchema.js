
const mongoose = require('mongoose');
const { Schema } = mongoose;

const bookSchema = new Schema({
  title: String,
  desc: String,
  email: String
});

module.exports = bookSchema;