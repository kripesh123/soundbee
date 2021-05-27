'use strict'

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('tests', [
            {
                userId:1,
                name:'Test A',
                slug:'test-a',
                description:'Test A Description',
                metaTitle:'Test A Meta Title',
                metaDescription:'Test A Meta Description',
                score: 20,
                isActive:true,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                userId:2,
                name:'Test B',
                slug:'test-b',
                description:'Test B Description',
                metaTitle:'Test B Meta Title',
                metaDescription:'Test B Meta Description',
                score: 10,
                isActive:true,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                userId:1,
                name:'Test C',
                slug:'test-c',
                description:'Test C Description',
                metaTitle:'Test C Meta Title',
                metaDescription:'Test C Meta Description',
                score: 20,
                isActive:true,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                userId:2,
                name:'Test D',
                slug:'test-d',
                description:'Test D Description',
                metaTitle:'Test D Meta Title',
                metaDescription:'Test D Meta Description',
                score: 10,
                isActive:true,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ])
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('tests', null, {})
    }
}


