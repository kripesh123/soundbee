'use strict'

// Workers
module.exports = function(sequelize, DataTypes) {
    let TestTake = sequelize.define('takes', {
        testId: {
            type: DataTypes.INTEGER
        },
        workerId: {
            type: DataTypes.INTEGER
        },
        content: {
            type: DataTypes.TEXT
        },
        score: {
            type: DataTypes.INTEGER
        },
        isActive: {
            type: DataTypes.BOOLEAN
        }
  })
  TestTake.associate = function(models) {
    TestTake.belongsTo(models.Test)
    TestTake.belongsTo(models.Worker)
  }
    return TestTake
}