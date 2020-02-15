'use strict';
/* eslint-disable semi */
/* eslint-disable no-unused-vars */
/* eslint-disable quotes */
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

let SECRET = process.env.SECRET || "myserverhasfleas";

let db = {};

let users = {};

let roles = {
  user: ['read'],
  editor: ['read', 'create', 'update'],
  admin: ['read', 'create', 'update', 'delete']
}

// Because we're using async bcrypt, this function needs to return a value or a promise rejection
users.save = async function (record) {

  if (!db[record.username]) {
    // Hash the password and save it to the user
    record.password = await bcrypt.hash(record.password, 5)

    // Create a new user
    db[record.username] = record;

    return record;

  }

  return Promise.reject();
}

// Because we're using async bcrypt, this function needs to return a value or a promise rejection
users.authenticateBasic = async function (user, pass) {

  try {
    let valid = await bcrypt.compare(pass, db[user].password);

    console.log(valid, db[user]);
    if (valid && db[user]) {
      return db[user];
    }
    else {
      return Promise.reject();
    }
  } catch (e) { return Promise.reject(); }

  
}

users.authenticateToken = async function (token) {
  try {
    let tokenObject = jwt.verify(token, SECRET);

    if (db[tokenObject.username]) {
       
      return Promise.resolve(tokenObject);
    }
    else {
      return Promise.reject();
    }
  } catch (e) { return Promise.reject(); }

  
}

users.generateToken = function (user) {
  let userData = {
    username: user.username,
    capabilities: roles[user.role]
  }
  let token = jwt.sign(userData, SECRET)
  return token;
}

users.list = () => db;

module.exports = users;