const { getAllArticles, postArticle } = require('../models/articlesModels');

exports.sendAllArticles = (req, res, next) => {
  const queryARgs = req.query;
  console.log(queryARgs);


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

exports.addArticle = (req, res, next) => {

};
