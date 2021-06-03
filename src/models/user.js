'use strict'

// User
module.exports = function (sequelize, DataTypes) {
    let User = sequelize.define('users', {
        name: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.TEXT
        },
        password: {
            type: DataTypes.TEXT
        },
        isActive: {
            type: DataTypes.BOOLEAN
        }
    })
    User.associate = function(models) {
        User.belongsToMany(models.Role, { through: models.UserRole})
    }
    return User;
}