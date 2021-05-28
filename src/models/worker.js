'use strict'

// Workers
module.exports = function(sequelize, DataTypes) {
 return sequelize.define('workers', {
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
}