'use strict'

// User
module.exports = function (sequelize, DataTypes) {
    let Role = sequelize.define('roles', {
        name: {
            type: DataTypes.STRING
        },
    })
    return Role;
}