const connection = require('../db/connection');

exports.getAllArticles = (args) => {
  console.log('\n\n >>>>>>> Hi from ARTICLES Model');

  console.log('QUERY ----> ', args);

  return connection.select('articles.author', 'articles.title', 'articles.article_id', 'articles.topic', 'articles.created_at', 'articles.votes')
    .count('comments.comment_id as comment_count')
    .from('articles')
    .leftJoin('comments', { 'comments.article_id': 'articles.article_id' })
    .groupBy('articles.article_id')
    .where(function () {
      if (args) {
        if (args.author) {
          this.where('articles.author', args.author);
        }
        // else if (whereConditions.selector) {
        //   this.where(whereConditions.selector, newSelectorValues[0])
        // }
      }
    })
    .orderBy('comment_count', 'desc')
    .then(articleArray => articleArray)
    .catch((err) => {
      console.log(err);
      next(err);
    });
};
