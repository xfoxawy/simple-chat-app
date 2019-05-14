'use strict';
var passwordHash = require('password-hash');

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('users', generateFakeUsers(), {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('users', null, {});
    },
};

function generateFakeUsers() {

    let users = []

    for (let i = 0; i < 10; i++) {
        let user = {}
        user.name = 'alaaelgndy' + i
        user.email = 'alaaelgndy' + i + '@gmail.com'
        user.password = passwordHash.generate('alaaelgndy'+i)
        user.createdAt = new Date()
        user.updatedAt = new Date()
        users.push(user)
    }
    return users
}
