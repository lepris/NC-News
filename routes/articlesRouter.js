const articlesRouter = require('express').Router();
const {
  sendAllArticles, addArticle, sendArticleById, sendCommentsByArticleId, addCommentsByArticleId,
} = require('../controllers/articlesControl');

articlesRouter.get('/:article_id', sendArticleById);
articlesRouter
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
