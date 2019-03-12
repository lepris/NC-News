const connection = require('../db/connection');

exports.insertUser = newUser => connection.insert(newUser).into('users').returning('*');
