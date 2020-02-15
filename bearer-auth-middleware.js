'use strict';
/* eslint-disable semi */
/* eslint-disable no-unused-vars */
/* eslint-disable quotes */

const users = require('./users.js');

module.exports = (req, res, next) => {

  
  if (!req.headers.authorization) { next('Invalid Login'); return; }

  
  let token = req.headers.authorization.split(' ').pop();

  
  users.authenticateToken(token)
    .then(validUser => {
      
      req.user = validUser;
      next();
    })
    .catch(err => next('Invalid Login'));

}