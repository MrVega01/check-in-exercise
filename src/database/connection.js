const mysql = require('mysql')
const { BD_AUTH } = require('../utils/constants')

const { USER_DB, PASSWORD_DB, HOST_DB, DATABASE_DB } = BD_AUTH
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
