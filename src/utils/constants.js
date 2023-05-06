const { config } = require('dotenv')
config()

const CONSTANTS = {
  PORT: process.env.PORT,
  HOST_DB: process.env.HOST_DB,
  USER_DB: process.env.USER_DB,
  PASSWORD_DB: process.env.PASSWORD_DB,
  DATABASE_DB: process.env.DATABASE_DB
}

module.exports = CONSTANTS
