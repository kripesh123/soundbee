module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('user_roles', {
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
            roleId: {
                allowNull: false,
                references: {
                    model: 'roles',
                    key: 'id'
                  },
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
        return queryInterface.dropTable('users')
    }
}
