const express = require('express')
const mysql = require('../mysql')
const users = express.Router()

/**
 * @api {post} /users
 * @apiGroup Users
 * @apiDescription Query users
 *
 * @apiParam (body) {String="experience","dateCreated"} [sort="dateCreated"] Optional. The user param with which to sort
 * @apiParam (body) {Bool} [ascending=true] Optional. Return in ascending order
 * @apiParam (body) {Number} [limit=100] Optional. The maximum return count of users
 * @apiParam (body) {Number} [offset=0] Optional. The starting index to return users
 * 
 * @apiSuccess {Object[]} users The users matching the query
 **/
users.post('/', (req, res) => {
    mysql.query((err, users) => {
        if (err) console.log(err)
        res.json({ userID: users })
        res.end()
    })
})

/**
 * @api {get} /users/:id
 * @apiGroup Users
 * @apiDescription Get a user by id
 *
 * @apiParam (param) {String} id The users id
 * 
 * @apiSuccess {Object} user The specified user
 * @apiError UserNotFound The user with the given id was not found
 **/
users.get('/:userID', (req, res) => {
    mysql.query((err, users) => {
        if (err) console.log(err)
        res.json({ userID: users })
        res.end()
    })
})

/**
 * @api {post} /users/new
 * @apiGroup Users
 * @apiDescription Create a new user
 *
 * @apiParam (body) {String} id The users id. Must be unique
 * @apiParam (body) {String} deviceUUID The device UUID
 * 
 * @apiSuccess {Object} user The new user
 * @apiError UserAlreadyExists The user with the given id already exists
 **/
users.post('/new', (req, res) => {
    res.json({ userID: req.body.userID });
    res.end()
})

module.exports = users