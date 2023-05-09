const app = require('./app')
const errorNotFound = require('./middlewares/404')
const errorHandler = require('./middlewares/errorHandler')
const flightsRoutes = require('./routes/flights.routes')

app.use(flightsRoutes)

app.use(errorNotFound)
app.use(errorHandler)

const PORT = app.get('PORT')
app.listen(PORT, () => console.log(`Server mounted on PORT ${PORT}`))
