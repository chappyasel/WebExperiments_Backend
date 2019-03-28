const express = require('express')
const mysql = require('../mysql')
const users = express.Router()

// get a user
users.get('/:userID', (req, res) => {
    mysql.query((err, users) => {
        if (err) console.log(err)
        res.json({ userID: users })
        res.end()
    })
})

// create a user
users.post('/new', (req, res) => {
    res.json({ userID: req.body.userID });
    res.end()
})

module.exports = users