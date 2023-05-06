const express = require('express')
const { PORT } = require('./utils/constants')

const app = express()

app.set('PORT', PORT || '3000')

module.exports = app
