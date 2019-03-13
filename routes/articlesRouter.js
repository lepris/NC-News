const articlesRouter = require('express').Router();
const { sendAllArticles } = require('../controllers/articlesControl');

articlesRouter.get('/', sendAllArticles)

  .all((req, res) => {
    res.status(405).send({ msg: 'Method not allowed' });
  });


module.exports = articlesRouter;
