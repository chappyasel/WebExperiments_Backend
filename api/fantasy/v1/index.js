const express = require('express')
const fantasy = express.Router()

fantasy.get('/login', (req, res, next) => {
    res.json({test: "success"})
})

module.exports = fantasy