
const jwt = require('jsonwebtoken');
const getKey = require('./getKey');
const profileAuthfunc = (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  jwt.verify(token, getKey, {}, (err, user) => {
    if(err){
      res.send('invalid token');
    }
    res.send(user);
  });
}

module.exports = profileAuthfunc;