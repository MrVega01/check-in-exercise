const errorNotFound = (req, res) => {
  res.status(404).json({
    code: 404,
    data: {}
  })
}

module.exports = errorNotFound
