const articlesRouter = require('express').Router();
const { sendAllArticles, addArticle, sendArticleById } = require('../controllers/articlesControl');

articlesRouter.get('/:article_id', sendArticleById);
articlesRouter
  .route('/')
  .get(sendAllArticles)
  .post(addArticle)
  .all((req, res, next) => {
    res.status(404).send({ message: 'Route not found' });
  });


module.exports = articlesRouter;
