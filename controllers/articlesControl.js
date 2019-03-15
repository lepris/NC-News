const {
  getAllArticles, getArticleById, getCommentsByArticleId, getCurrentArticleCount, postArticle,
} = require('../models/articlesModels');
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
  const endParams = req.params;

  if (/[^0-9]/.test(endParams.article_id)) {
    return next({ code: 400, message: 'Invalid input type, please provide a number' });
  }
  getCurrentArticleCount()
    .then((currentCount) => {
      if (endParams.article_id > currentCount[0].count) {
        console.log('rejecting...');
        return next({ code: 404, message: 'This id is not currently in our database' });
      }
    });
  getArticleById(endParams)

    .then((returnedArticle) => {
      const newArticle = returnedArticle[0];
      newArticle.author = newArticle.username;
      delete newArticle.username;

      return newArticle;
    })
    .then((article) => {
      console.log('//////>RESULT OF CONTROLLER\n\n\n', article);
      res.status(200).send({ article });
    })
    .catch((err) => {
      next(err);
    });
};

exports.sendCommentsByArticleId = (req, res, next) => {
  const queryArgs = req.query;
  const endParams = req.params;
  console.log('\n\n////////Hello from ARTicle/comments controller\n', queryArgs, '\n', endParams);
  if (/[^0-9]/.test(endParams.article_id)) {
    return next({ code: 400, message: 'Invalid input type, please provide a number' });
  }
  getCurrentArticleCount()
    .then((currentCount) => {
      if (endParams.article_id > currentCount[0].count) {
        console.log('rejecting...');
        return next({ code: 404, message: 'Article id is not currently in our database' });
      }
    });
  getCommentsByArticleId([queryArgs, endParams])
    .then((comments) => {
      console.log('//////>RESULT OF CONTROLLER\n\n\n', comments);
      if (comments[0]) {
        res.status(200).send({ comments });
      } else {
        return Promise.reject({ code: 204, message: 'No comment data for this article' });
      }
    })
    .catch((err) => {
      next(err);
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
