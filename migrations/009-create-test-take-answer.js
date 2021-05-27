module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('test_take_answers', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            takeId: {
                allowNull: false,
                references: {
                    model: 'test_takes',
                    key: 'id'
                  },
                type: Sequelize.INTEGER
            },
            answerId: {
                allowNull: false,
                references: {
                    model: 'test_answers',
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
                allowNull: true,
                defaultValue:'-',
                type: Sequelize.TEXT
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
        return queryInterface.dropTable('test_take_answers')
    }
}
