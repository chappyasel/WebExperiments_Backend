import express = require('express')
const weightliftingApp = express.Router()

// MARK - child routes
weightliftingApp.use('/feedback', require('./feedback'))
weightliftingApp.use('/users', require('./users'))

export = weightliftingApp
