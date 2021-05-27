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

    return User;
}