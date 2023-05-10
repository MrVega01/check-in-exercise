const { Router } = require('express')
const getConnection = require('../database/connection')
const seatAssigner = require('../utils/seatAssigner')

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

  airplane.name as airplane_name,

  passenger.dni,
  passenger.name as passenger_name,
  passenger.age,
  passenger.country,

  seat.seat_column,
  seat.seat_row,

  seat_type.name as seat_type_name

  FROM boarding_pass

  INNER JOIN flight 
  ON boarding_pass.flight_id = flight.flight_id

  INNER JOIN airplane 
  ON airplane.airplane_id = flight.airplane_id

  INNER JOIN passenger 
  ON passenger.passenger_id = boarding_pass.passenger_id

  INNER JOIN seat_type
  ON seat_type.seat_type_id = boarding_pass.seat_type_id

  LEFT JOIN seat 
  ON seat.seat_id = boarding_pass.seat_id
  
  WHERE boarding_pass.flight_id = ${id};`, async (error, results, fields) => {
    if (error) {
      next(error)
      return
    }
    const flightSample = results[0]
    const passengerList = await seatAssigner({
      connection,
      data: results,
      airplaneName: flightSample.airplane_name,
      next
    })
    res.status(200).json({
      code: 200,
      data: {
        flightId: flightSample.flight_id,
        takeoffDateTime: flightSample.takeoff_date_time,
        takeoffAirport: flightSample.takeoff_airport,
        landingDateTime: flightSample.landing_date_time,
        landingAirport: flightSample.landing_airport,
        airplaneId: flightSample.airplane_id,
        passengers: passengerList
      }
    })
  })
  connection.end()
})

module.exports = router
