import Sequelize from 'sequelize';

import db from './database'

const models = {
     User: db.import('../models/user'),
     Role: db.import('../models/role'),
     UserRole: db.import('../models/userRole'),
     Worker: db.import('../models/worker'),
     Test: db.import('../models/test'),
     TestQuestion: db.import('../models/testQuestion'),
     TestAnswer: db.import('../models/testAnswer'),
     TestTake: db.import('../models/take')
}

Object.keys(models).forEach(modelName => {
    if (models[modelName].associate) {
        models[modelName].associate(models)
    }
})

models.sequelize = db
models.Sequelize = Sequelize

export default models
