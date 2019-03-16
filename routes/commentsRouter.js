const commentsRouter = require('express').Router();
const { patchCommentVotes, deleteComment } = require('../controllers/commentsControl');

commentsRouter
  .route('/')
  .all((req, res, next) => {
    res.status(405).send({ message: 'Method not allowed' });
  });
commentsRouter
  .route('/:comment_id')
  .patch(patchCommentVotes)
  .delete(deleteComment)
  .all((req, res, next) => {
    res.status(405).send({ message: 'Method not allowed' });
  });


module.exports = commentsRouter;
