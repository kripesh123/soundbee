'use strict'

// User
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('roles', {
        name: {
            type: DataTypes.STRING
        },
    })
}