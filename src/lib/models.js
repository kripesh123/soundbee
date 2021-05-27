import Sequelize from 'sequelize';

import db from './database'

const models = {
     User: db.import('../models/user/model'),
     Role: db.import('../models/role/model'),
     UserRole: db.import('../models/user-role/model'),
     Worker: db.import('../models/worker/model'),
}

Object.keys(models).forEach(modelName => {
    if (models[modelName].associate) {
        models[modelName].associate(models)
    }
})

models.sequelize = db
models.Sequelize = Sequelize

export default models
