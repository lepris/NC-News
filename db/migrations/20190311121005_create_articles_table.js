
exports.up = function (knex, Promise) {
  return knex.schema.createTable('articles', (articlesTable) => {
    articlesTable.increments('article_id').primary();
    articlesTable.string('title');
    articlesTable.string('body', 5000).notNullable();
    articlesTable.integer('votes').defaultsTo(0);
    articlesTable.string('topic').references('slug').inTable('topics');
    articlesTable.string('author').references('username').inTable('users');
    articlesTable.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('articles');
};
