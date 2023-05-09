const mysql = require('mysql')
const { USER_DB, PASSWORD_DB, HOST_DB, DATABASE_DB } = require('../utils/constants')

const dbCredentials = {
  host: HOST_DB,
  user: USER_DB,
  password: PASSWORD_DB,
  database: DATABASE_DB
}

function getConnection (callback) {
  const connection = mysql.createConnection(dbCredentials)
  connection.connect((error) => {
    if (error) callback(error)
  })
  return connection
}

module.exports = getConnection
