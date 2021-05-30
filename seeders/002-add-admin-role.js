'use strict'

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('roles', [
            {
                name: 'admin',
                isActive:true,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'read:take_answer',
                isActive:true,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ])
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('roles', null, {})
    }
}


