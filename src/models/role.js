'use strict'

// User
module.exports = function (sequelize, DataTypes) {
    let Role = sequelize.define('roles', {
        name: {
            type: DataTypes.STRING
        },
    })
    Role.associate = function(models) {
        Role.belongsToMany(models.User, { through: models.UserRole})
    }
    return Role;
}