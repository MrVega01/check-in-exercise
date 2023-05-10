const { Router } = require('express')
const getFlights = require('../controllers/flights.controller')

const router = Router()

router.get('/flights/:id/passengers', getFlights)

module.exports = router
