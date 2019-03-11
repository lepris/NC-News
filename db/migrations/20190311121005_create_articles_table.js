
exports.up = function (knex, Promise) {
    console.log('creating ARTICLES table ------>');

    return knex.schema.createTable('articles', articlesTable => {
        articlesTable.increments('article_id').primary();
        articlesTable.string('title');
        articlesTable.string('body', 5000).notNullable();
        articlesTable.string('author').references('username').inTable('users');
        articlesTable.string('created_at');
    })
        .then((articlesTable) => {
            console.log('------> FINISHED creating ARTICLES table ')

        })
};

exports.down = function (knex, Promise) {
    console.log('deleting ARTICLES table');
    return knex.schema.dropTable('articles');
};
