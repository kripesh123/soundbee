'use strict'

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('questions', [
            { testId:1, content:'Capital City of Germany?', score: 5, isActive:true, createdAt: new Date(), updatedAt: new Date()},
            { testId:1, content:'Capital City of Estonia?', score: 5, isActive:true, createdAt: new Date(), updatedAt: new Date()},
            { testId:1, content:'Capital City of Bhutan?', score: 5, isActive:true, createdAt: new Date(), updatedAt: new Date()},
            { testId:1, content:'Capital City of Nepal?', score: 5, isActive:true, createdAt: new Date(), updatedAt: new Date()},
            { testId:2, content:'National Animal of Argentina?', score: 2, isActive:true, createdAt: new Date(), updatedAt: new Date()},
            { testId:2, content:'National Animal of Spain?', score: 2, isActive:true, createdAt: new Date(), updatedAt: new Date()},
            { testId:2, content:'National Animal of Egypt?', score: 3, isActive:true, createdAt: new Date(), updatedAt: new Date()},
            { testId:2, content:'National Animal of Brazil?', score: 3, isActive:true, createdAt: new Date(), updatedAt: new Date()},
            { testId:3, content:'National Sport of UAE?', score: 5, isActive:true, createdAt: new Date(), updatedAt: new Date()},
            { testId:3, content:'National Sport of Poland?', score: 5, isActive:true, createdAt: new Date(), updatedAt: new Date()},
            { testId:3, content:'National Sport of Australia?', score: 5, isActive:true, createdAt: new Date(), updatedAt: new Date()},
            { testId:3, content:'National Sport of Canada?', score: 5, isActive:true, createdAt: new Date(), updatedAt: new Date()},
            { testId:4, content:'National Bird of China?', score: 2, isActive:true, createdAt: new Date(), updatedAt: new Date()},
            { testId:4, content:'National Bird of Russia?', score: 3, isActive:true, createdAt: new Date(), updatedAt: new Date()},
            { testId:4, content:'National Bird of Bangladesh?', score: 3, isActive:true, createdAt: new Date(), updatedAt: new Date()},
            { testId:4, content:'National Bird of USA?', score: 2, isActive:true, createdAt: new Date(), updatedAt: new Date()},
            
        ])
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('questions', null, {})
    }
}


