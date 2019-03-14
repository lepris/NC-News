const connection = require('../db/connection');

exports.getAllArticles = (args) => {
  console.log('\n\n////////MODEL ARTICLES');

  console.log('\n////////MODEL ARTICLES QUERY ', args);

  if (args.order && args.order !== 'asc' && args.order !== 'desc') {
    console.log('rejecting...');
    return Promise.reject({ code: 404, message: 'Please input asc or desc' });
  }

  return connection.select('articles.author', 'articles.title', 'articles.article_id', 'articles.topic', 'articles.created_at', 'articles.votes')
    .count('comments.comment_id as comment_count')
    .from('articles')
    .leftJoin('comments', { 'comments.article_id': 'articles.article_id' })
    .groupBy('articles.article_id')
    .where(function () {
      if (args) {
        if (args.author) {
          this.where('articles.author', args.author);
        } else if (args.topic) {
          this.where('articles.topic', args.topic);
        }
      }
    })
    .orderBy(args.sort_by || 'articles.created_at', args.order || 'desc');
};
