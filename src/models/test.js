'use strict'

// Workers
module.exports = function(sequelize, DataTypes) {
    let Test = sequelize.define('tests', {
        userId: {
            type: DataTypes.INTEGER
        },
        name: {
            type: DataTypes.STRING
        },
        slug: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.TEXT
        },
        metaTitle: {
            type: DataTypes.TEXT
        },
        metaDescription: {
            type: DataTypes.TEXT
        },
        score: {
            type: DataTypes.INTEGER
        },
        isActive: {
            type: DataTypes.BOOLEAN
        }
  })
  Test.associate = function(models) {
    Test.belongsTo(models.User)
    Test.hasMany(models.TestQuestion, {as : 'questions'})
  }
    return Test
}