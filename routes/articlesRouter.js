const articlesRouter = require('express').Router();
const {
  sendAllArticles,
  addArticle,
  sendArticleById,
  sendCommentsByArticleId,
  addCommentsByArticleId,
  patchArticleVotes,
  deleteArticleById,
} = require('../controllers/articlesControl');

articlesRouter
  .param('article_id', (req, res, next, article_id) => {
    if (/\d+/.test(article_id)) {
      next();
    } else {
      next({ code: 400, message: 'Invalid article id' });
    }
  })
  .route('/:article_id')
  .get(sendArticleById)
  .patch(patchArticleVotes)
  .delete(deleteArticleById)
  .all((req, res, next) => {
    res.status(405).send({ message: 'Method not allowed' });
  });


articlesRouter
  .param('article_id', (req, res, next, article_id) => {
    if (/\d+/.test(article_id)) {
      next();
    } else {
      next({ code: 400, message: 'Invalid article id' });
    }
  })
  .route('/:article_id/comments')
  .get(sendCommentsByArticleId)
  .post(addCommentsByArticleId)
  .all((req, res, next) => {
    res.status(405).send({ message: 'Method not allowed' });
  });
articlesRouter
  .route('/')
  .get(sendAllArticles)
  .post(addArticle)
  .all((req, res, next) => {
    res.status(405).send({ message: 'Method not allowed' });
  });


module.exports = articlesRouter;
