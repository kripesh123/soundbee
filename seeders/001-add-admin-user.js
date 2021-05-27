'use strict'

const bcrypt = require('bcrypt')
const config = require('../config/server')

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('users', [
            {
                name: 'The Admin',
                email: 'admin@audiobee.com',
                password: bcrypt.hashSync('admin123', config.saltRounds),
                isActive:true,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'The Admin 2',
                email: 'admin2@audiobee.com',
                password: bcrypt.hashSync('admin321', config.saltRounds),
                isActive:true,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ])
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('users', null, {})
    }
}


