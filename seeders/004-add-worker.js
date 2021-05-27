'use strict'

const bcrypt = require('bcrypt')
const config = require('../config/server')

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('workers', [
            {
                name: 'The Worker',
                email: 'worker@audiobee.com',
                password: bcrypt.hashSync('worker123', config.saltRounds),
                isActive:true,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'The Worker 2',
                email: 'worker2@audiobee.com',
                password: bcrypt.hashSync('worker321', config.saltRounds),
                isActive:true,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ])
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('workers', null, {})
    }
}


