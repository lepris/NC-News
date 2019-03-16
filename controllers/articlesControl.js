const {
  getAllArticles,
  getArticleById,
  getCommentsByArticleId,
  getCurrentArticleCount,
  postArticle,
  postComment,
  updateVotesByArticleId,
} = require('../models/articlesModels');
const { checkInput } = require('../db/utils/articlesCheckInput');

exports.sendAllArticles = (req, res, next) => {
  const queryArgs = req.query;
  getAllArticles(queryArgs).then((articles) => {
    if (articles[0]) res.status(200).send({ articles });
    else {

      return next({ code: 404, message: 'Sorry no articles found' });
    }
  })
    .catch(next);
};

exports.sendArticleById = (req, res, next) => {
  const endParams = req.params;

  getCurrentArticleCount()
    .then((currentCount) => {
      if (endParams.article_id > currentCount[0].count) {
        return next({ code: 404, message: 'This id is not currently in our database' });
      }
    });
  getArticleById(endParams)

    .then((article) => {
      res.status(200).send({ article });
    })
    .catch(next);
};

exports.sendCommentsByArticleId = (req, res, next) => {
  const queryArgs = req.query;
  const endParams = req.params;

  if (/[^0-9]/.test(endParams.article_id)) {
    return next({ code: 400, message: 'Invalid input type, please provide a number' });
  }
  getCurrentArticleCount()
    .then((currentCount) => {
      if (endParams.article_id > currentCount[0].count) {
        return next({ code: 404, message: 'Article id is not currently in our database' });
      }
    });
  getCommentsByArticleId([queryArgs, endParams])
    .then((comments) => {
      if (comments[0]) {
        res.status(200).send({ comments });
      } else {
        return next({ code: 204, message: 'No comment data for this article' });
      }
    })
    .catch(next);
};

exports.addArticle = (req, res, next) => {


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
      res.status(201).send({ article: addedArticle });
    })
    .catch(next);
};

exports.addCommentsByArticleId = (req, res, next) => {
  const newData = { ...req.body, ...req.params };
  postComment(newData)
    .then((postedComment) => {
      res.status(201).send({ postedComment });
    })
    .catch(next);
};

exports.patchArticleVotes = (req, res, next) => {
  const votesData = { ...req.body, ...req.params };
  if (!votesData.inc_votes) {
    votesData.inc_votes = 0;
  }
  if (typeof votesData.inc_votes !== 'number') {
    return next({ code: 400, message: 'Please provide a number' });
  }
  updateVotesByArticleId(votesData)
    .then((updatedVotes) => {
      res.status(200).send(updatedVotes);
    });
};
