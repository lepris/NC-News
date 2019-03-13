const { getAllArticles } = require('../models/articlesModels');

exports.sendAllArticles = (req, res, next) => {
  const queryARgs = req.query;
  console.log(queryARgs);
  getAllArticles(queryARgs).then((articles) => {
    console.log('\n\n >>>>>>> ', articles[0]);
    res.status(200).send({ articles });
  });
};
