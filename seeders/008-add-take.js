'use strict'

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('takes', [
            { testId:1, workerId: 1, content:'Good', score:15, isActive:true, createdAt: new Date(), updatedAt: new Date()},
            { testId:1, workerId: 2, content:'Good', score:10, isActive:true, createdAt: new Date(), updatedAt: new Date()},
            { testId:2, workerId: 1, content:'Bad', score:5, isActive:true, createdAt: new Date(), updatedAt: new Date()},
            { testId:2, workerId: 2, content:'Good', score:8, isActive:true, createdAt: new Date(), updatedAt: new Date()},
            { testId:3, workerId: 1, content:'Poor', score:5, isActive:true, createdAt: new Date(), updatedAt: new Date()},
            { testId:3, workerId: 2, content:'Perfect', score:20, isActive:true, createdAt: new Date(), updatedAt: new Date()},
            { testId:4, workerId: 1, content:'Good', score:6, isActive:true, createdAt: new Date(), updatedAt: new Date()},
            { testId:4, workerId: 2, content:'Perfect', score:10, isActive:true, createdAt: new Date(), updatedAt: new Date()},           
        ])
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('takes', null, {})
    }
}


