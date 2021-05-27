import Sequelize from 'sequelize';

import db from './database'

const models = {
    // User: databaseConnection.import(__dirname + '../models/user/model'),
    // Role: databaseConnection.import(__dirname + '../models/role/model'),
    // UserRole: databaseConnection.import(__dirname + '../models/user-role/model'),
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
