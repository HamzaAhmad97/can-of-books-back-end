
const seedBook = require('./seedBook');
const addBook = (req, res) => {
  seedBook(req.body);
  res.send(`Book "${req.body.title}" has been added, with a description "${req.body.desc}", for the user with the email "${req.body.email}".`).status(200);
};

module.exports = addBook;