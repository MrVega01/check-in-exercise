const { Router } = require('express')
const getConnection = require('../database/connection')

const router = Router()

router.get('/flights/:id/passengers', (req, res, next) => {
  const { id } = req.params
  const connection = getConnection(next)
  connection.query(`SELECT
  boarding_pass.boarding_pass_id,
  boarding_pass.flight_id,
  boarding_pass.passenger_id,
  boarding_pass.purchase_id,
  boarding_pass.seat_id,
  boarding_pass.seat_type_id,

  flight.takeoff_date_time,
  flight.takeoff_airport,
  flight.landing_date_time,
  flight.landing_airport,
  flight.airplane_id,

  passenger.dni,
  passenger.name,
  passenger.age,
  passenger.country

  FROM boarding_pass

  INNER JOIN passenger 
  ON boarding_pass.passenger_id = passenger.passenger_id

  INNER JOIN flight 
  ON boarding_pass.flight_id = flight.flight_id
  
  WHERE boarding_pass.flight_id = ${id};`, (error, results, fields) => {
    if (error) {
      next(error)
      return
    }
    const { flight_id, takeoff_date_time, takeoff_airport, landing_date_time, landing_airport, airplane_id } = results[0]
    const passengersInfo = results.map(passenger => ({
      passengerId: passenger.passenger_id,
      dni: passenger.dni,
      name: passenger.name,
      age: passenger.age,
      country: passenger.country,
      boardingPassId: passenger.boarding_pass_id,
      purchaseId: passenger.purchase_id,
      seatTypeId: passenger.seat_type_id,
      seatId: passenger.seat_id
    }))
    res.status(200).json({
      code: 200,
      data: {
        flightId: flight_id,
        takeoffDateTime: takeoff_date_time,
        takeoffAirport: takeoff_airport,
        landingDateTime: landing_date_time,
        landingAirport: landing_airport,
        airplaneId: airplane_id,
        passengers: passengersInfo
      }
    })
  })
  connection.end()
})

module.exports = router
