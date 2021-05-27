'use strict'

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('user_roles', [
            {
                userId:1,
                roleId:1,
                isActive:true,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                userId:2,
                roleId:1,
                isActive:true,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ])
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('user_roles', null, {})
    }
}


