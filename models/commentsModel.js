const connection = require('../db/connection');

exports.deleteCommentById = data => connection.from('comments').where('comment_id', '=', data.comment_id).del().returning('*');
