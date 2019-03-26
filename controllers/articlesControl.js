const {
  getAllArticles,
  getArticleById,
  getCommentsByArticleId,
  getCurrentArticleCount,
  postArticle,
  postComment,
  updateVotesByArticleId,
  deleteArticleById,
  getAuthors,
  getTopics,
} = require('../models/articlesModels');
const { checkInput } = require('../db/utils/articlesCheckInput');

exports.sendAllArticles = (req, res, next) => {
  const queryArgs = req.query;
  if (queryArgs.author) {
    getAuthors(queryArgs.author)
      .then((author) => {
        if (author.length === 0) {
          return next({ code: 400, message: 'Sorry this author does not exist' });
        }
      });
  }
  if (queryArgs.topic) {
    getTopics(queryArgs.topic)
      .then((topic) => {
        if (topic.length === 0) {
          return next({ code: 400, message: 'Sorry this topic does not exist' });
        }
      });
  }

  getAllArticles(queryArgs).then((articles) => {
    if (articles[0]) res.status(200).send({ articles });
    else {
      res.status(200).send({ message: 'No articles for this topic yet' });
    }
  })
    .catch(next);
};

exports.sendArticleById = (req, res, next) => {
  const { article_id } = req.params;

  getCurrentArticleCount()
    .then((currentCount) => {
      if (article_id > currentCount[0].count) {
        return next({ code: 404, message: 'This id is not currently in our database' });
      }
    });
  getArticleById(article_id)

    .then((article) => {
      if (article[0]) {
        res.status(200).send(...article);
      } else {
        return next({ code: 404, message: 'Not Found' });
      }
    })
    .catch(next);
};

exports.sendCommentsByArticleId = (req, res, next) => {
  const { order, sort_by, limit } = req.query;
  const { article_id } = req.params;

  getCurrentArticleCount()
    .then((currentCount) => {
      if (article_id > currentCount[0].count) {
        return next({ code: 404, message: 'Article id is not currently in our database' });
      }
    });
  getCommentsByArticleId(order, sort_by, limit, article_id)
    .then((comments) => {
      if (comments[0]) {
        res.status(200).send({ comments });
      } else {
        return next({ code: 404, message: 'Not Found' });
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
  const { article_id } = req.params;
  getArticleById(article_id)
    .then((article) => {
      if (!article[0]) {
        return next({ code: 404, message: 'Not Found' });
      }
    });
  postComment(newData)
    .then((postedComment) => {
      res.status(201).send(...postedComment);
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
      res.status(200).send(...updatedVotes);
    })
    .catch(next);
};


exports.deleteArticleById = (req, res, next) => {
  const { article_id } = req.params;
  getArticleById(article_id)
    .then((article) => {
      if (!article[0]) {
        return next({ code: 404, message: 'Not Found' });
      }
    });
  deleteArticleById(article_id)
    .then((deleted) => {
      if (deleted[0]) {
        res.status(204).send('No content');
      } else {
        return next({ code: 404, message: `Article with id ${article_id} does not exist` });
      }
    });
};
