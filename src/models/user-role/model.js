'use strict'

// User
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('user_roles', {
        userId: {
            type: DataTypes.STRING
        },
        roleId: {
            type: DataTypes.STRING
        },
    })
}