const articlesRouter = require('express').Router();
const { sendAllArticles, addArticle } = require('../controllers/articlesControl');

articlesRouter
  .route('/')
  .get(sendAllArticles)
  .post(addArticle)
  .all((req, res, next) => {
    res.status(404).send({ message: 'Route not found' });
  });


module.exports = articlesRouter;
