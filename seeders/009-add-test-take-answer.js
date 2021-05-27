'use strict'

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('test_take_answers', [
            { takeId:1, questionId: 1, answerId:1, isActive:true, createdAt: new Date(), updatedAt: new Date()},
            { takeId:1, questionId: 2, answerId:7, isActive:true, createdAt: new Date(), updatedAt: new Date()},
            { takeId:1, questionId: 3, answerId:10, isActive:true, createdAt: new Date(), updatedAt: new Date()},
            { takeId:1, questionId: 4, answerId:14, isActive:true, createdAt: new Date(), updatedAt: new Date()},

            { takeId:2, questionId: 1, answerId:2, isActive:true, createdAt: new Date(), updatedAt: new Date()},
            { takeId:2, questionId: 2, answerId:7, isActive:true, createdAt: new Date(), updatedAt: new Date()},
            { takeId:2, questionId: 3, answerId:12, isActive:true, createdAt: new Date(), updatedAt: new Date()},
            { takeId:2, questionId: 4, answerId:16, isActive:true, createdAt: new Date(), updatedAt: new Date()},

            { takeId:3, questionId: 5, answerId:17, isActive:true, createdAt: new Date(), updatedAt: new Date()},
            { takeId:3, questionId: 6, answerId:21, isActive:true, createdAt: new Date(), updatedAt: new Date()},
            { takeId:3, questionId: 7, answerId:28, isActive:true, createdAt: new Date(), updatedAt: new Date()},
            { takeId:3, questionId: 8, answerId:30, isActive:true, createdAt: new Date(), updatedAt: new Date()},

            { takeId:4, questionId: 5, answerId:17, isActive:true, createdAt: new Date(), updatedAt: new Date()},
            { takeId:4, questionId: 6, answerId:22, isActive:true, createdAt: new Date(), updatedAt: new Date()},
            { takeId:4, questionId: 7, answerId:28, isActive:true, createdAt: new Date(), updatedAt: new Date()},
            { takeId:4, questionId: 8, answerId:30, isActive:true, createdAt: new Date(), updatedAt: new Date()},
            
            { takeId:5, questionId: 9, answerId:34, isActive:true, createdAt: new Date(), updatedAt: new Date()},
            { takeId:5, questionId: 10, answerId:38, isActive:true, createdAt: new Date(), updatedAt: new Date()},
            { takeId:5, questionId: 11, answerId:44, isActive:true, createdAt: new Date(), updatedAt: new Date()},
            { takeId:5, questionId: 12, answerId:46, isActive:true, createdAt: new Date(), updatedAt: new Date()},

            { takeId:6, questionId: 9, answerId:33, isActive:true, createdAt: new Date(), updatedAt: new Date()},
            { takeId:6, questionId: 10, answerId:39, isActive:true, createdAt: new Date(), updatedAt: new Date()},
            { takeId:6, questionId: 11, answerId:44, isActive:true, createdAt: new Date(), updatedAt: new Date()},
            { takeId:6, questionId: 12, answerId:46, isActive:true, createdAt: new Date(), updatedAt: new Date()},

            { takeId:7, questionId: 13, answerId:50, isActive:true, createdAt: new Date(), updatedAt: new Date()},
            { takeId:7, questionId: 14, answerId:55, isActive:true, createdAt: new Date(), updatedAt: new Date()},
            { takeId:7, questionId: 15, answerId:60, isActive:true, createdAt: new Date(), updatedAt: new Date()},
            { takeId:7, questionId: 16, answerId:64, isActive:true, createdAt: new Date(), updatedAt: new Date()},

            { takeId:8, questionId: 13, answerId:49, isActive:true, createdAt: new Date(), updatedAt: new Date()},
            { takeId:8, questionId: 14, answerId:55, isActive:true, createdAt: new Date(), updatedAt: new Date()},
            { takeId:8, questionId: 15, answerId:60, isActive:true, createdAt: new Date(), updatedAt: new Date()},
            { takeId:8, questionId: 16, answerId:62, isActive:true, createdAt: new Date(), updatedAt: new Date()},
            
        ])
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('test_take_answers', null, {})
    }
}


