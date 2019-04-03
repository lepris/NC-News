const commentsRouter = require('express').Router();
const { patchCommentVotes, deleteComment } = require('../controllers/commentsControl');



commentsRouter
  .param('comment_id', (req, res, next, comment_id) => {
    if (/\d+/.test(comment_id)) {
      next();
    } else {
      next({ code: 400, message: 'Invalid comment id' });
    }
  })
  .route('/:comment_id')
  .patch(patchCommentVotes)
  .delete(deleteComment)
  .all((req, res, next) => {
    res.status(405).send({ message: 'Method not allowed' });
  });

commentsRouter
  .route('/')
  .all((req, res, next) => {
    res.status(405).send({ message: 'Method not allowed' });
  });


module.exports = commentsRouter;
