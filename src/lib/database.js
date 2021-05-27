import { Sequelize } from 'sequelize'
import winston from 'winston';

import settings from './settings'

// Create new database connection
const connection = new Sequelize(settings.databaseConfigEnv.database,
    settings.databaseConfigEnv.username, settings.databaseConfigEnv.password, {
    host: settings.databaseConfigEnv.host,
    dialect: settings.databaseConfigEnv.dialect,
    logging: false
})

// Test connection
winston.info('SETUP - Connecting database...')

connection
    .authenticate()
    .then(() => {
        winston.info('INFO - Database connected.')
    })
    .catch(err => {
        winston.error('ERROR - Unable to connect to the database:', err)
    })

export default connection
