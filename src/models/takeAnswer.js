'use strict'

// Workers
module.exports = function(sequelize, DataTypes) {
    let TestTakeAnswer = sequelize.define('take_answers', {
        takeId: {
            type: DataTypes.INTEGER
        },
        questionId: {
            type: DataTypes.INTEGER
        },
        answerId: {
            type: DataTypes.INTEGER
        },
        content: {
            type: DataTypes.TEXT
        },
        isActive: {
            type: DataTypes.BOOLEAN
        }
  })
  TestTakeAnswer.associate = function(models) {
    TestTakeAnswer.belongsTo(models.TestTake)
    TestTakeAnswer.belongsTo(models.TestQuestion)
    TestTakeAnswer.belongsTo(models.TestAnswer)

  }
    return TestTakeAnswer
}