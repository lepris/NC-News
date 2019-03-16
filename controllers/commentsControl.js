const { deleteCommentById, updateVotesByCommentId } = require('../models/commentsModel');

exports.patchCommentVotes = (req, res, next) => {
  const votesData = { ...req.body, ...req.params };
  if (!votesData.inc_votes) {
    votesData.inc_votes = 0;
  }
  if (typeof votesData.inc_votes !== 'number') {
    return next({ code: 400, message: 'Please provide a number' });
  }
  updateVotesByCommentId(votesData)
    .then((updatedVotes) => {
      res.status(200).send(updatedVotes);
    });
};

exports.deleteComment = (req, res, next) => {
  const commentId = req.params.comment_id;
  deleteCommentById(commentId)
    .then((deletedComment) => {
      if (deletedComment[0]) {
        res.status(204).send('No content');
      } else {
        return next({ code: 404, message: `Comment with id ${commentId} does not exist` });
      }
    });
};
