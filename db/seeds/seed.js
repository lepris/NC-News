const {
  userData, articleData, topicData, commentData,
} = require('../data');
const { dateConversion, articleRef, commentRefined } = require('../utils/dateConversion');

exports.seed = function (knex, Promise) {
  return knex.migrate.rollback()
    .then(() => knex.migrate.latest())
    .then(() => knex('users').insert(userData).returning('*'))
    .then((userRows) => {
      console.log('\n-----> SEEDING USER rows', userRows[0]);
    })
    .then(() => knex('topics').insert(topicData).returning('*'))
    .then((topicRows) => {
      console.log('\n-----> SEEDING TOPIC rows', topicRows[0]);
    })
    .then(() => {
      const newArticleData = dateConversion(articleData);
      return knex('articles').insert(newArticleData).returning('*');
    })
    .then((articleRows) => {
      // console.log('\n-----> these are ARticle rows', articleRows[0]);
      const refObj = articleRef(articleRows);
      const newCommentData = commentRefined(refObj, commentData);
      const newDateData = dateConversion(newCommentData);
      const comments = knex('comments').insert(newDateData).returning('*');
      // remmeber to include them as an array
      return Promise.all([comments, refObj, articleRows]);
    })
    .then(([comments, refObj, articleRows]) => {
      console.log('\n-----> SEEDING ARticle rows', articleRows[0]);
      return Promise.all([comments, refObj, articleRows]);
    })

    .then(([comments, refObj, articleRows]) => {
      // remmember to put the arguments in the same order
      console.log('\n-----> SEEDING Comments rows', comments[0]);
    });
};
