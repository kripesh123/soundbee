'use strict'

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('tests', [
            {
                userId:1,
                name:'Capital City',
                slug:'capital-city',
                description:'Capital City Description',
                metaTitle:'Capital City Meta Title',
                metaDescription:'Capital City Meta Description',
                score: 20,
                isActive:true,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                userId:2,
                name:'National Animal',
                slug:'national-animal',
                description:'National Animal Description',
                metaTitle:'National Animal Meta Title',
                metaDescription:'National Animal Meta Description',
                score: 10,
                isActive:true,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                userId:1,
                name:'National Sport',
                slug:'national-sport',
                description:'National Sport Description',
                metaTitle:'National Sport Meta Title',
                metaDescription:'National Sport Meta Description',
                score: 20,
                isActive:true,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                userId:2,
                name:'National Bird',
                slug:'national-bird',
                description:'National Bird Description',
                metaTitle:'National Bird Meta Title',
                metaDescription:'National Bird Meta Description',
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


