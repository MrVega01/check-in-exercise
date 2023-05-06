const mysql = require('mysql')
const { USER_DB, PASSWORD_DB, HOST_DB, DATABASE_DB } = require('../utils/constants')

const dbCredentials = {
  host: HOST_DB,
  user: USER_DB,
  password: PASSWORD_DB,
  database: DATABASE_DB
}
const connection = mysql.createConnection(dbCredentials)

function getConnection () {
  connection.connect((error) => {
    if (error) throw error
    else console.log('Database connected')
  })
  return connection
}

module.exports = getConnection
