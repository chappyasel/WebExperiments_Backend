import express = require('express')
const users = express.Router()
import util = require('../../../../util')

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
users.post(
  '/',
  util.wrap((req: any, res: any) => {
    // mysql.query((err, users) => {
    //   if (err) return next(boom.failedDependency('DatabaseConnection'))
    //   res.json({ userID: users })
    // })
  })
)

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
users.get(
  '/:userID',
  util.wrap((req: any, res: any) => {
    // res.json({ test: req.params.userID })
    // mysql.query((err, users) => {
    //     if (err) return next(boom.failedDependency("DatabaseConnection"))
    //     res.json({ userID: users })
    // })
  })
)

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
users.post(
  '/new',
  util.wrap((req: any, res: any) => {
    // res.json({ userID: req.body.userID })
    // res.end()
  })
)

export = users
