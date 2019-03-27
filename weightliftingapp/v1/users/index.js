const express = require('express')
const users = express.Router()

// get a user
users.get('/:userID', (req, res) => {
    res.json({ userID: req.params.userID })
    res.end()
})

// create a user
users.post('/new', (req, res) => {
    res.json({ userID: req.body.userID });
    res.end()
})

module.exports = users