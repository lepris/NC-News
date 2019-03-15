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

exports.getArticleById = data => connection.select('users.username as author', 'articles.title', 'articles.body', 'articles.article_id', 'articles.topic', 'articles.created_at', 'articles.votes')
  .count('comments.comment_id as comment_count')
  .from('articles')
  .leftJoin('comments', { 'comments.article_id': 'articles.article_id' })
  .leftJoin('users', { 'users.username': 'articles.author' })
  .groupBy('articles.article_id', 'users.username')
  .where('articles.article_id', '=', data.article_id);


exports.getCommentsByArticleId = ([args, data]) => {
  console.log('\n\nCOMMENTS model data', data);
  console.log('\n\nCOMMENTS model data', args);

  if (args.order && args.order !== 'asc' && args.order !== 'desc') {
    console.log('rejecting...');
    return Promise.reject({ code: 404, message: 'Please input asc or desc' });
  }

  return connection.select('comment_id', 'votes', 'created_at', 'author', 'body')
    .from('comments')
    // .leftJoin('comments', { 'comments.article_id': 'articles.article_id' })
    .leftJoin('users', { 'users.username': 'comments.author' })
    // .groupBy('articles.article_id', 'users.username')
    .where('comments.article_id', '=', data.article_id)
    .orderBy(args.sort_by || 'comments.created_at', args.order || 'desc');
};

exports.postArticle = (data) => {
  console.log('\n///////MODEL OUTPUT', data);
  return connection.insert(data).into('articles').returning('*');
};
exports.getCurrentArticleCount = () => {
  console.log('\n\n\n CURRENT COUNT');
  return connection.count('article_id').from('articles');
};
