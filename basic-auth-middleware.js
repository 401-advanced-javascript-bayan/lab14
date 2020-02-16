'use strict';
/* eslint-disable semi */
/* eslint-disable no-unused-vars */
/* eslint-disable quotes */

const base64 = require('base-64');

const users = require('./users.js');

module.exports = (req, res, next) => {

  // req.headers.authorization should be : "Basic sdkjdsljd="

  if (!req.headers.authorization) { next('Invalid Login'); return; }

  
  let basic = req.headers.authorization.split(' ').pop();

  
  let [user, pass] = base64.decode(basic).split(':');

    users.authenticateBasic(user, pass)
    .then(validUser => {
      req.token = users.generateToken(validUser);
      next();
    })
    .catch(err => next('Invalid Login'));

}