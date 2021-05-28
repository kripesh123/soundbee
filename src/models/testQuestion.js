'use strict'

// Workers
module.exports = function(sequelize, DataTypes) {
    let TestQuestion = sequelize.define('test_questions', {
        testId: {
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
  TestQuestion.associate = function(models) {
    TestQuestion.belongsTo(models.Test)
  }
    return TestQuestion
}