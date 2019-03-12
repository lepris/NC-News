
exports.up = function (knex, Promise) {
  console.log('creating COMMENTS table ------>');

  return knex.schema.createTable('comments', (commentsTable) => {
    commentsTable.increments('comment_id').primary();
    commentsTable.string('author').references('username').inTable('users');
    commentsTable.integer('article_id').references('article_id').inTable('articles');
    commentsTable.integer('votes').defaultsTo(0);
    commentsTable.string('created_at');
    commentsTable.string('body', 30000);
  })
    .then((commentsTable) => {
      console.log('-----> finished building COMMENTS table');
    });
};

exports.down = function (knex, Promise) {
  console.log('Deleting COMMENTS table ------>');
  return knex.schema.dropTable('comments');
};
