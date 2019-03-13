const connection = require('../db/connection');

function getAllTopics() {
  return connection.select('*').from('topics');
}

function postTopic(data) {
  console.log('\nMODEL DATA', data);
  return connection.insert(data).into('topics').returning('*');
}

module.exports = { getAllTopics, postTopic };
