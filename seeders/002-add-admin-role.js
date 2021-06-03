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
                name: 'dashboard',
                isActive:true,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'read:test',
                isActive:true,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'write:test',
                isActive:true,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'read:question',
                isActive:true,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'write:question',
                isActive:true,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'read:answer',
                isActive:true,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'write:answer',
                isActive:true,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'read:take',
                isActive:true,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'write:take',
                isActive:true,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'read:take_answer',
                isActive:true,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'write:take_answer',
                isActive:true,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'read:worker',
                isActive:true,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'write:worker',
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


