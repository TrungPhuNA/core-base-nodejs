import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'
import dbConfig from '../../config/database.js'

dotenv.config()

const env = process.env.NODE_ENV || 'development'
const config = dbConfig[env]

const sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    port: config.port,
    dialect: config.dialect,
    logging: config.logging,
    pool: config.pool,
    define: config.define,
})

const db = {
    sequelize,
    Sequelize,
}

export default db

