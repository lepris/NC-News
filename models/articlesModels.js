const connection = require('../db/connection');

exports.getAuthors = author => connection('articles').select('author').where('author', '=', author).returning('*');
exports.getTopics = topic => connection('topics').select('slug').where('slug', '=', topic).returning('*');

exports.getAllArticles = ({
  order, author, topic, sort_by,
}) => {
  if (order && order !== 'asc' && order !== 'desc') {
    return Promise.reject({ code: 404, message: 'Please input asc or desc' });
  }

  return connection.select('articles.author', 'articles.title', 'articles.article_id', 'articles.topic', 'articles.created_at', 'articles.votes')
    .count('comments.comment_id as comment_count')
    .from('articles')
    .leftJoin('comments', { 'comments.article_id': 'articles.article_id' })
    .groupBy('articles.article_id')
    .where(function () {
      if (author) {
        this.where('articles.author', author);
      } else if (topic) {
        this.where('articles.topic', topic);
      }
    })
    .orderBy(sort_by || 'articles.created_at', order || 'desc');
};

exports.getArticleById = article_id => connection.select('users.username as author', 'articles.title', 'articles.body', 'articles.article_id', 'articles.topic', 'articles.created_at', 'articles.votes')
  .count('comments.comment_id as comment_count')
  .from('articles')
  .leftJoin('comments', { 'comments.article_id': 'articles.article_id' })
  .leftJoin('users', { 'users.username': 'articles.author' })
  .groupBy('articles.article_id', 'users.username')
  .where('articles.article_id', '=', article_id);


exports.getCommentsByArticleId = (order, sort_by, limit, article_id) => {
  if (order && order !== 'asc' && order !== 'desc') {
    return Promise.reject({ code: 404, message: 'Please input asc or desc' });
  }

  return connection.select('comment_id', 'votes', 'created_at', 'author', 'body')
    .from('comments')
    .leftJoin('users', { 'users.username': 'comments.author' })
    .where('comments.article_id', '=', article_id)
    .orderBy(sort_by || 'comments.created_at', order || 'desc')
    .limit(limit || 10);
};

exports.postArticle = data => connection.insert(data).into('articles').returning('*');

exports.postComment = data => connection.insert(data).into('comments').returning('*');

exports.getCurrentArticleCount = () => connection.count('article_id').from('articles');

exports.updateVotesByArticleId = ({ article_id, inc_votes }) => connection('articles').where('article_id', '=', article_id).increment('votes', inc_votes || 0).returning('*');

exports.deleteArticleById = article_id => connection.from('articles').where('article_id', '=', article_id).del().returning('*');
