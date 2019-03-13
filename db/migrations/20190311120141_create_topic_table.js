
exports.up = function (knex, Promise) {
  // console.log('creating TOPICS table --->');
  return knex.schema.createTable('topics', (topicsTable) => {
    topicsTable.string('slug').primary();
    topicsTable.string('description');
  })
    .then((topicsTable) => {
      //   console.log('------> FINISHED creating TOPICS table ');
    });
};

exports.down = function (knex, Promise) {
  // console.log('Removing TOPICS table');
  return knex.schema.dropTable('topics');
};
