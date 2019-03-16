const { deleteCommentById } = require('../models/commentsModel');

exports.patchCommentVotes = (req, res, next) => {
  updateVotesByCommentId(vot5esData)
    .then((updatedVotes) => {
      res.status(200).send(updatedVotes);
    });
};

exports.deleteComment = (req, res, next) => {
  const data = req.params;
  console.log('\n////', data);

  deleteCommentById(data)
    .then((deletedComment) => {
      if (deletedComment[0]) {
        res.status(204).send('No content');
      } else {
        return next({ code: 404, message: `Comment with id ${data.comment_id} does not exist` });
      }
    });
};
