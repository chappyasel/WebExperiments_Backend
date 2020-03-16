const express = require('express')
const boom = require('boom')
const mysql = require('../util/mysql')
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
    if (err) return next(boom.serverUnavailable('DatabaseConnection'))
    res.json({ userID: users })
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
users.get('/:userID', (req, res, next) => {
  res.json({ test: req.params.userID })
  // mysql.query((err, users) => {
  //     if (err) return next(boom.serverUnavailable("DatabaseConnection"))
  //     res.json({ userID: users })
  // })
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
users.post('/new', (req, res, next) => {
  res.json({ userID: req.body.userID })
  res.end()
})

module.exports = users
