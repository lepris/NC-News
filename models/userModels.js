const connection = require('../db/connection');

exports.insertUser = newUser => connection.insert(newUser).into('users').returning('*');

exports.sendUsers = () => connection.select('*').from('users');

exports.sendUserByUsername = data => connection.select('*').from('users').where('username', '=', data);
