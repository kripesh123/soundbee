'use strict'

// Workers
module.exports = function(sequelize, DataTypes) {
    let TestAnswer = sequelize.define('answers', {
        testId: {
            type: DataTypes.INTEGER
        },
        questionId: {
            type: DataTypes.INTEGER
        },
        content: {
            type: DataTypes.TEXT
        },
        isCorrect: {
            type: DataTypes.BOOLEAN
        },
        isActive: {
            type: DataTypes.BOOLEAN
        }
  })
  TestAnswer.associate = function(models) {
    TestAnswer.belongsTo(models.Test)
    TestAnswer.belongsTo(models.TestQuestion)
    TestAnswer.belongsTo(models.TestTakeAnswer)
  }
    return TestAnswer
}