module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('test_answers', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            testId: {
                allowNull: false,
                references: {
                    model: 'tests',
                    key: 'id'
                  },
                type: Sequelize.INTEGER
            },
            questionId: {
                allowNull: false,
                references: {
                    model: 'test_questions',
                    key: 'id'
                  },
                type: Sequelize.INTEGER
            },
            content: {
                allowNull: false,
                type: Sequelize.TEXT
            },
            isCorrect:{
                allowNull: false,
                defaultValue:false,
                type: Sequelize.BOOLEAN
            },
            isActive:{
                allowNull: false,
                defaultValue:false,
                type: Sequelize.BOOLEAN
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        })
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('test_answers')
    }
}
