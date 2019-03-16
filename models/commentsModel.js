const connection = require('../db/connection');

exports.deleteCommentById = comment_id => connection.from('comments').where('comment_id', '=', comment_id).del().returning('*');

exports.updateVotesByCommentId = ({ comment_id, inc_votes }) => connection('comments').where('comment_id', '=', comment_id).increment('votes', inc_votes || 0).returning('*');
