'use strict';

const base64 = require('base-64');
const users = require('./users.js');

module.exports= (req,res,next) => {
  if(!req.headers.authentication){next('cannot login'); return;}
  let basicAuthorization = req.headers.authorization.split(' ').pop();
  let [username,password] = base64.decode(basicAuthorization).split(':');
  users.authentication(username,password)
    .then(validUser => {
      req.token = users.generateToken(validUser);
      next();
    }).catch( err => next('cannot login'));
};