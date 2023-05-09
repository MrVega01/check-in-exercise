const ERRORS_LIST = {
  ENOTFOUND: (res) => {
    res.status(400).json({
      code: 400,
      errors: 'could not connect to db'
    })
  },
  defaultError: (res) => {
    res.status(500).json({
      code: 500,
      errors: 'internal server error'
    })
  }
}

const errorHandler = (err, req, res, next) => {
  const errorFunction = ERRORS_LIST[err.code] || ERRORS_LIST.defaultError

  errorFunction(res)
}

module.exports = errorHandler
