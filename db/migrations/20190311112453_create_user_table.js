
exports.up = function (knex, Promise) {
    console.log('creating USERS table ------>')
    return knex.schema.createTable('users', usersTable => {
        usersTable.string('username').primary();
        usersTable.string('avatar_url');
        usersTable.string('name').notNullable();
    })
    .then(usersTable=> {
        console.log('------> FINISHED creating USERS table ')
    })
};

exports.down = function (knex, Promise) {
    console.log('Removing USERS table')
    return knex.schema.dropTable('users');
};
