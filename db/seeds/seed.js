const {
  userData, articleData, topicData, commentData,
} = require('../data');
const { convertDates, articleRef, commentRefined } = require('../utils/dateConversion');

exports.seed = function (knex, Promise) {
  return knex.migrate.rollback()
    .then(() => knex.migrate.latest())
    .then(() => Promise.all([knex('users').insert(userData).returning('*'),
      knex('topics').insert(topicData).returning('*')]))
    .then(() => {
      const newArticleData = convertDates(articleData);
      return knex('articles').insert(newArticleData).returning('*');
    })
    .then((articleRows) => {
      const refObj = articleRef(articleRows);
      const newCommentData = commentRefined(refObj, commentData);
      const newDateData = convertDates(newCommentData);
      const comments = knex('comments').insert(newDateData).returning('*');

      return Promise.all([comments, refObj, articleRows]);
    });
};
