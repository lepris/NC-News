const { userData, articleData, topicData, commentData } = require('../data')

exports.seed = function (knex, Promise) {
    return knex.migrate.rollback()
        .then(() => {
            console.log('\n####> Seeding Users table ')
            return knex.migrate.latest()
        })
        .then(() => {
            return knex('users').insert(userData).returning('*')
        })
        .then(userRows => {
            console.log('\n-----> these are USER rows', userRows[0])
        })
        .then(() => {
            return knex('topics').insert(topicData).returning('*')
        })
        .then(topicRows => {
            console.log('\n-----> these are TOPIC rows', topicRows[0])
        })
}