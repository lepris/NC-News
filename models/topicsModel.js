const connection = require('../db/connection');

exports.getAllTopics = () => connection.select('*').from('topics');

exports.postTopic = data => connection.insert(data).into('topics').returning('*');
