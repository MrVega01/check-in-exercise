const { config } = require('dotenv')
config()

const PORT = process.env.PORT
const BD_AUTH = {
  HOST_DB: process.env.HOST_DB,
  USER_DB: process.env.USER_DB,
  PASSWORD_DB: process.env.PASSWORD_DB,
  DATABASE_DB: process.env.DATABASE_DB
}
const AIRPLANES = {
  'AirNova-660': {
    firstClass: {
      A: [0, 0, 0, 0],
      B: [0, 0, 0, 0],
      F: [0, 0, 0, 0],
      G: [0, 0, 0, 0]
    },
    premium: {
      A: [0, 0, 0, 0, 0, 0, 0, 0],
      B: [0, 0, 0, 0, 0, 0, 0, 0],
      C: [0, 0, 0, 0, 0, 0, 0, 0],
      E: [0, 0, 0, 0, 0, 0, 0, 0],
      F: [0, 0, 0, 0, 0, 0, 0, 0],
      G: [0, 0, 0, 0, 0, 0, 0, 0]
    },
    economic: {
      A: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      B: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      C: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      E: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      F: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      G: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    }
  },
  'AirMax-720neo': {
    firstClass: {
      A: [0, 0, 0, 0, 0],
      E: [0, 0, 0, 0, 0],
      I: [0, 0, 0, 0, 0]
    },
    premium: {
      A: [0, 0, 0, 0, 0, 0],
      B: [0, 0, 0, 0, 0, 0],
      D: [0, 0, 0, 0, 0, 0],
      E: [0, 0, 0, 0, 0, 0],
      F: [0, 0, 0, 0, 0, 0],
      H: [0, 0, 0, 0, 0, 0],
      I: [0, 0, 0, 0, 0, 0]
    },
    economic: {
      A: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      B: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      D: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      E: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      F: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      H: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      I: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    }
  }
}
const AIRPLANES_SEATS_LIMITS = {
  'AirNova-660': {
    firstClass: [1, 4],
    premium: [8, 15],
    economic: [19, 34]
  },
  'AirMax-720neo': {
    firstClass: [1, 5],
    premium: [9, 14],
    economic: [18, 31]
  }
}
module.exports = { PORT, BD_AUTH, AIRPLANES, AIRPLANES_SEATS_LIMITS }
