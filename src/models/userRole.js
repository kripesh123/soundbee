'use strict'

// User
module.exports = function (sequelize, DataTypes) {
    let UserRole = sequelize.define('user_roles', {
        userId: {
            type: DataTypes.INTEGER
        },
        roleId: {
            type: DataTypes.INTEGER
        },
    })
    UserRole.associate = function(models) {
        UserRole.belongsTo(models.User)
        UserRole.belongsTo(models.Role)
      }
    return UserRole
}