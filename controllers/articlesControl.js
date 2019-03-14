const { getAllArticles, getArticleById, postArticle } = require('../models/articlesModels');
const { checkInput } = require('../db/utils/articlesChechInput');

exports.sendAllArticles = (req, res, next) => {
  const queryARgs = req.query;
  getAllArticles(queryARgs).then((articles) => {
    console.log('\n\n/////////////////CONTROLLER ARTICLES RESULT\n\n', articles.slice(0, 2));
    if (articles[0]) res.status(200).send({ articles });
    else {
      console.log('rejecting...');
      return Promise.reject({ code: 404, message: 'Knex returned no results' });
    }
  })
    .catch((err) => {
      console.log('....moving to next');
      next(err);
    });
};

exports.sendArticleById = (req, res, next) => {
  console.log('/////VIsit in function for id param');
  const endParams = req.params;
  console.log(endParams);
  getArticleById(endParams)
    .then((returnedArticle) => {
      console.log('\n\n', returnedArticle);
      const newArticle = returnedArticle[0];
      newArticle.author = returnedArticle[0].username;
      delete newArticle.username;

      return newArticle;
    })
    .then((article) => {
      console.log('//////>RESULT OF CONTROLLER\n\n\n', article);
      res.status(200).send({ article });
    });
};

exports.addArticle = (req, res, next) => {
  console.log('\n\n\n Article Visit in the controller');

  const newArticle = req.body;
  const validatedInput = checkInput(newArticle);


  if (!validatedInput) {
    return next({ code: 400, message: 'Please input data correctly: title body topic username' });
  }
  if (validatedInput.code === 'badlang') {
    return next({ code: 400, message: validatedInput.message });
  }

  if (validatedInput.code === 'bodyTooShort') {
    return next({ code: 400, message: validatedInput.message });
  }


  postArticle(validatedInput)
    .then(([addedArticle]) => {
      console.log('/////////////CONTROLLER OUTPUT', addedArticle);
      res.status(201).send({ article: addedArticle });
    })
    .catch((err) => {
      next(err);
    });
};
