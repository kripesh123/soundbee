'use strict'

// User
module.exports = function (sequelize, DataTypes) {
    let UserRole = sequelize.define('user_roles', {
        userId: {
            type: DataTypes.STRING
        },
        roleId: {
            type: DataTypes.STRING
        },
    })
    UserRole.associate = function(models) {
        UserRole.belongsTo(models.User)
        UserRole.belongsTo(models.Role)
      }
    return UserRole
}