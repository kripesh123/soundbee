module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('tests', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            userId: {
                allowNull: false,
                references: {
                    model: 'users',
                    key: 'id'
                  },
                type: Sequelize.INTEGER
            },
            name: {
                allowNull: false,
                type: Sequelize.STRING
            },
            slug: {
                allowNull: false,
                type: Sequelize.STRING
            },
            description: {
                allowNull: false,
                type: Sequelize.TEXT
            },
            metaTitle: {
                allowNull: true,
                type: Sequelize.TEXT
            },
            metaDescription: {
                allowNull: true,
                type: Sequelize.TEXT
            },
            score: {
                allowNull: false,
                type: Sequelize.INTEGER
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
        return queryInterface.dropTable('tests')
    }
}
