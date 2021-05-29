module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('takes', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            workerId: {
                allowNull: false,
                references: {
                    model: 'workers',
                    key: 'id'
                  },
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
            content: {
                allowNull: true,
                type: Sequelize.TEXT
            },
            score:{
                allowNull: true,
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
        return queryInterface.dropTable('takes')
    }
}
