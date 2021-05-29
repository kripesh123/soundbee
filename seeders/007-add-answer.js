'use strict'

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('answers', [
            { testId:1, questionId: 1, content:'Berlin', isCorrect:true, isActive:true, createdAt: new Date(), updatedAt: new Date()},
            { testId:1, questionId: 1, content:'Hamburg', isCorrect:false, isActive:true, createdAt: new Date(), updatedAt: new Date()},
            { testId:1, questionId: 1, content:'Munich (München)', isCorrect:false, isActive:true, createdAt: new Date(), updatedAt: new Date()},
            { testId:1, questionId: 1, content:'frankfurt', isCorrect:false, isActive:true, createdAt: new Date(), updatedAt: new Date()},
            { testId:1, questionId: 2, content:'Tartu', isCorrect:false, isActive:true, createdAt: new Date(), updatedAt: new Date()},
            { testId:1, questionId: 2, content:'Narva', isCorrect:false, isActive:true, createdAt: new Date(), updatedAt: new Date()},
            { testId:1, questionId: 2, content:'Tallinn', isCorrect:true, isActive:true, createdAt: new Date(), updatedAt: new Date()},
            { testId:1, questionId: 2, content:'Viljandi', isCorrect:false, isActive:true, createdAt: new Date(), updatedAt: new Date()},
            { testId:1, questionId: 3, content:'Trongsa', isCorrect:false, isActive:true, createdAt: new Date(), updatedAt: new Date()},
            { testId:1, questionId: 3, content:'Punakha', isCorrect:false, isActive:true, createdAt: new Date(), updatedAt: new Date()},
            { testId:1, questionId: 3, content:'Paro', isCorrect:false, isActive:true, createdAt: new Date(), updatedAt: new Date()},
            { testId:1, questionId: 3, content:'Thimphu', isCorrect:true, isActive:true, createdAt: new Date(), updatedAt: new Date()},
            { testId:1, questionId: 4, content:'Pokhara', isCorrect:false, isActive:true, createdAt: new Date(), updatedAt: new Date()},
            { testId:1, questionId: 4, content:'Kathmandu', isCorrect:true, isActive:true, createdAt: new Date(), updatedAt: new Date()},
            { testId:1, questionId: 4, content:'Nepalgunj', isCorrect:false, isActive:true, createdAt: new Date(), updatedAt: new Date()},
            { testId:1, questionId: 4, content:'Butwal', isCorrect:false, isActive:true, createdAt: new Date(), updatedAt: new Date()},
            
            { testId:2, questionId: 5, content:'Cow', isCorrect:true, isActive:true, createdAt: new Date(), updatedAt: new Date()},
            { testId:2, questionId: 5, content:'Cat', isCorrect:false, isActive:true, createdAt: new Date(), updatedAt: new Date()},
            { testId:2, questionId: 5, content:'Tiger', isCorrect:false, isActive:true, createdAt: new Date(), updatedAt: new Date()},
            { testId:2, questionId: 5, content:'Lion', isCorrect:false, isActive:true, createdAt: new Date(), updatedAt: new Date()},
            { testId:2, questionId: 6, content:'Leopard', isCorrect:false, isActive:true, createdAt: new Date(), updatedAt: new Date()},
            { testId:2, questionId: 6, content:'Snake', isCorrect:false, isActive:true, createdAt: new Date(), updatedAt: new Date()},
            { testId:2, questionId: 6, content:'Whale', isCorrect:true, isActive:true, createdAt: new Date(), updatedAt: new Date()},
            { testId:2, questionId: 6, content:'Dragon', isCorrect:false, isActive:true, createdAt: new Date(), updatedAt: new Date()},
            { testId:2, questionId: 7, content:'Bear', isCorrect:false, isActive:true, createdAt: new Date(), updatedAt: new Date()},
            { testId:2, questionId: 7, content:'Crocodile', isCorrect:false, isActive:true, createdAt: new Date(), updatedAt: new Date()},
            { testId:2, questionId: 7, content:'Hippo', isCorrect:false, isActive:true, createdAt: new Date(), updatedAt: new Date()},
            { testId:2, questionId: 7, content:'Kangaroo', isCorrect:true, isActive:true, createdAt: new Date(), updatedAt: new Date()},
            { testId:2, questionId: 8, content:'Zebra', isCorrect:false, isActive:true, createdAt: new Date(), updatedAt: new Date()},
            { testId:2, questionId: 8, content:'Elephant', isCorrect:true, isActive:true, createdAt: new Date(), updatedAt: new Date()},
            { testId:2, questionId: 8, content:'Bull', isCorrect:false, isActive:true, createdAt: new Date(), updatedAt: new Date()},
            { testId:2, questionId: 8, content:'Monkey', isCorrect:false, isActive:true, createdAt: new Date(), updatedAt: new Date()},
            
            { testId:3, questionId: 9, content:'Soccer', isCorrect:true, isActive:true, createdAt: new Date(), updatedAt: new Date()},
            { testId:3, questionId: 9, content:'Basketball', isCorrect:false, isActive:true, createdAt: new Date(), updatedAt: new Date()},
            { testId:3, questionId: 9, content:'Tennis', isCorrect:false, isActive:true, createdAt: new Date(), updatedAt: new Date()},
            { testId:3, questionId: 9, content:'Baseball', isCorrect:false, isActive:true, createdAt: new Date(), updatedAt: new Date()},
            { testId:3, questionId: 10, content:'Golf', isCorrect:false, isActive:true, createdAt: new Date(), updatedAt: new Date()},
            { testId:3, questionId: 10, content:'Volleyball', isCorrect:false, isActive:true, createdAt: new Date(), updatedAt: new Date()},
            { testId:3, questionId: 10, content:'Badminton', isCorrect:true, isActive:true, createdAt: new Date(), updatedAt: new Date()},
            { testId:3, questionId: 10, content:'Snowboarding', isCorrect:false, isActive:true, createdAt: new Date(), updatedAt: new Date()},
            { testId:3, questionId: 11, content:'Boxing', isCorrect:false, isActive:true, createdAt: new Date(), updatedAt: new Date()},
            { testId:3, questionId: 11, content:'Table Tennis', isCorrect:false, isActive:true, createdAt: new Date(), updatedAt: new Date()},
            { testId:3, questionId: 11, content:'Skiing', isCorrect:false, isActive:true, createdAt: new Date(), updatedAt: new Date()},
            { testId:3, questionId: 11, content:'Cricket', isCorrect:true, isActive:true, createdAt: new Date(), updatedAt: new Date()},
            { testId:3, questionId: 12, content:'Bowling', isCorrect:false, isActive:true, createdAt: new Date(), updatedAt: new Date()},
            { testId:3, questionId: 12, content:'Ice Hockey', isCorrect:true, isActive:true, createdAt: new Date(), updatedAt: new Date()},
            { testId:3, questionId: 12, content:'Rugby', isCorrect:false, isActive:true, createdAt: new Date(), updatedAt: new Date()},
            { testId:3, questionId: 12, content:'Surfing', isCorrect:false, isActive:true, createdAt: new Date(), updatedAt: new Date()},
           
            { testId:4, questionId: 13, content:'Bubba', isCorrect:true, isActive:true, createdAt: new Date(), updatedAt: new Date()},
            { testId:4, questionId: 13, content:'Scruffy', isCorrect:false, isActive:true, createdAt: new Date(), updatedAt: new Date()},
            { testId:4, questionId: 13, content:'Baldy', isCorrect:false, isActive:true, createdAt: new Date(), updatedAt: new Date()},
            { testId:4, questionId: 13, content:'Zippy', isCorrect:false, isActive:true, createdAt: new Date(), updatedAt: new Date()},
            { testId:4, questionId: 14, content:'Plucky', isCorrect:false, isActive:true, createdAt: new Date(), updatedAt: new Date()},
            { testId:4, questionId: 14, content:'Daffy', isCorrect:false, isActive:true, createdAt: new Date(), updatedAt: new Date()},
            { testId:4, questionId: 14, content:'Ozzy', isCorrect:true, isActive:true, createdAt: new Date(), updatedAt: new Date()},
            { testId:4, questionId: 14, content:'Flossy', isCorrect:false, isActive:true, createdAt: new Date(), updatedAt: new Date()},
            { testId:4, questionId: 15, content:'Chip', isCorrect:false, isActive:true, createdAt: new Date(), updatedAt: new Date()},
            { testId:4, questionId: 15, content:'Hootie', isCorrect:false, isActive:true, createdAt: new Date(), updatedAt: new Date()},
            { testId:4, questionId: 15, content:'Birdie', isCorrect:false, isActive:true, createdAt: new Date(), updatedAt: new Date()},
            { testId:4, questionId: 15, content:'Poppy', isCorrect:true, isActive:true, createdAt: new Date(), updatedAt: new Date()},
            { testId:4, questionId: 16, content:'Chickie', isCorrect:false, isActive:true, createdAt: new Date(), updatedAt: new Date()},
            { testId:4, questionId: 16, content:'Nigel', isCorrect:true, isActive:true, createdAt: new Date(), updatedAt: new Date()},
            { testId:4, questionId: 16, content:'Peeps', isCorrect:false, isActive:true, createdAt: new Date(), updatedAt: new Date()},
            { testId:4, questionId: 16, content:'Crow', isCorrect:false, isActive:true, createdAt: new Date(), updatedAt: new Date()},
           
        ])
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('answers', null, {})
    }
}


