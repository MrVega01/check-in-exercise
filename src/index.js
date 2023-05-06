const app = require('./app')
const getConnection = require('./database/connection')

const connection = getConnection()
connection.query('SELECT * from seat', (error, results, fields) => {
  if (error) throw error
  results.map(result => console.log(result))
})

const PORT = app.get('PORT')
app.listen(PORT, () => console.log(`Server mounted on PORT ${PORT}`))
