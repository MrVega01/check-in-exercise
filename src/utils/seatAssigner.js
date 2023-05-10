const getConnection = require('../database/connection')
const { AIRPLANES, AIRPLANES_SEATS_LIMITS } = require('./constants')

function seatAssigner ({ data, airplaneName, next }) {
  const connection = getConnection(next)
  const passengerList = []
  const airplane = { ...AIRPLANES[airplaneName] }
  const { firstClass, premium, economic } = AIRPLANES_SEATS_LIMITS[airplaneName]

  return new Promise((resolve, reject) => {
    connection.query('SELECT * from seat', (error, results, fields) => {
      if (error) {
        next(error)
      }
      const seatsAssigned = data.filter(passenger => passenger.seat_id !== null)
      const seatsUnassigned = data.filter(passenger => passenger.seat_id === null)
      const seatsGrouped = {}
      seatsUnassigned.forEach(passenger => {
        const purchaseId = passenger.purchase_id
        if (!seatsGrouped[purchaseId]) seatsGrouped[purchaseId] = []
        seatsGrouped[purchaseId].push(passenger)
      })
      const minorsGrouped = Object.values(seatsGrouped).filter(group => group.some(passenger => passenger.age < 18))
      const majorsGrouped = Object.values(seatsGrouped).filter(group => group.some(passenger => passenger.age >= 18))

      // Register seats pre-marked
      seatsAssigned.forEach(passenger => {
        const seatRow = passenger.seat_row
        const seatColumn = passenger.seat_column
        if (seatRow >= firstClass[0] && seatRow <= firstClass[1]) airplane.firstClass[seatColumn][seatRow - firstClass[0]] = 1
        else if (seatRow >= premium[0] && seatRow <= premium[1]) airplane.premium[seatColumn][seatRow - premium[0]] = 1
        else if (seatRow >= economic[0] && seatRow <= economic[1]) airplane.economic[seatColumn][seatRow - economic[0]] = 1
        const passengerPremarked = generatePassengerInfo(passenger, passenger.seat_id)
        passengerList.push(passengerPremarked)
      })
      // Register seats unmarked
      /// Minors
      minorsGrouped.forEach(group => {
        const groupAssigned = assignSeatToGroup(airplane, airplaneName, group[0].seat_type_id, true, group)
        groupAssigned.forEach(passenger => {
          const seatId = getSeatId(results, passenger.seat_row, passenger.seat_column, passenger.airplane_id)
          passengerList.push(generatePassengerInfo(passenger, seatId))
        })
      })
      /// Majors
      majorsGrouped.forEach(group => {
        const groupAssigned = assignSeatToGroup(airplane, airplaneName, group[0].seat_type_id, false, group)
        groupAssigned.forEach(passenger => {
          const seatId = getSeatId(results, passenger.seat_row, passenger.seat_column, passenger.airplane_id)
          passengerList.push(generatePassengerInfo(passenger, seatId))
        })
      })
      return resolve(passengerList)
    })
  })
}
module.exports = seatAssigner

function assignSeatToGroup (airplane, airplaneName, typeId, minors, group) {
  const seatsLimits = AIRPLANES_SEATS_LIMITS[airplaneName]
  const type = typeId === 1 ? 'firstClass' : typeId === 2 ? 'premium' : 'economic'
  const columnDistribution = airplaneName === 'AirNova-660'
    ? {
        firstClass: [['A', 'B'], ['F', 'G']],
        premium: [['A', 'B', 'C'], ['E', 'F', 'G']],
        economic: [['A', 'B', 'C'], ['E', 'F', 'G']]
      }
    : {
        firstClass: [['A', 'E', 'I']],
        premium: [['A', 'B'], ['D', 'E', 'F'], ['H', 'I']],
        economic: [['A', 'B'], ['D', 'E', 'F'], ['H', 'I']]
      }
  const groupLength = group.length
  let groupCounter = 0
  const groupAssigned = []

  if (minors) {
    const groupSorted = group.sort(function (a, b) {
      return a.age - b.age
    })
    columnDistribution[type].forEach(columns => {
      for (let i = 0; i <= seatsLimits[type][1] - seatsLimits[type][0]; i++) {
        if (columns.filter(column => airplane[type][column][i] === 0).length >= 2) {
          columns.forEach(column => {
            if (!airplane[type][column][i] && groupLength !== groupCounter) {
              airplane[type][column][i] = 1
              groupAssigned.push({ ...groupSorted[groupCounter], seat_row: i + seatsLimits[type][0], seat_column: column })
              groupCounter++
            }
          })
        }
      }
    })
  } else {
    columnDistribution[type].forEach(columns => {
      for (let i = 0; i <= seatsLimits[type][1] - seatsLimits[type][0]; i++) {
        columns.forEach(column => {
          if (!airplane[type][column][i] && groupLength !== groupCounter) {
            airplane[type][column][i] = 1
            groupAssigned.push({ ...group[groupCounter], seat_row: i + seatsLimits[type][0], seat_column: column })
            groupCounter++
          }
        })
      }
    })
  }
  return groupAssigned
}
function generatePassengerInfo (passenger, seatId) {
  return ({
    passengerId: passenger.passenger_id,
    dni: passenger.dni,
    name: passenger.passenger_name,
    age: passenger.age,
    country: passenger.country,
    boardingPassId: passenger.boarding_pass_id,
    purchaseId: passenger.purchase_id,
    seatTypeId: passenger.seat_type_id,
    seatId
  })
}
function getSeatId (seats, seatRow, seatColumn, airplaneId) {
  const seat = seats.find(seat => (
    seat.seat_row === seatRow &&
    seat.seat_column === seatColumn &&
    seat.airplane_id === airplaneId
  ))
  return seat?.seat_id
}
