const articlesRouter = require('express').Router();
const {
  sendAllArticles, addArticle, sendArticleById, sendCommentsByArticleId,
} = require('../controllers/articlesControl');

articlesRouter.get('/:article_id', sendArticleById);
articlesRouter.get('/:article_id/comments', sendCommentsByArticleId);
articlesRouter
  .route('/')
  .get(sendAllArticles)
  .post(addArticle)
  .all((req, res, next) => {
    res.status(404).send({ message: 'Route not found' });
  });


module.exports = articlesRouter;
