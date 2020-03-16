const express = require('express')
const boom = require('boom')
const feedback = express.Router()
const { requireParam } = require('../util')
const db = require('./db')
const { v4: uuid } = require('uuid')

/**
 * @api {post} /feedback
 * @apiGroup Feedback
 * @apiDescription Query users
 *
 * @apiParam (body) {String="experience","dateCreated"} [sort="dateCreated"]
 *                  Optional. The user param with which to sort
 * @apiParam (body) {Bool} [ascending=true] Optional. Return in ascending order
 * @apiParam (body) {Number} [limit=100] Optional. The max return count of users
 * @apiParam (body) {Number} [offset=0] Optional. The start index to return users
 *
 * @apiSuccess {Object[]} users The users matching the query
 **/
feedback.post('/', (req, res) => {
  res.json({
    '1': '2',
  })
  return next(boom.serverUnavailable('DatabaseConnection'))
})

/**
 * @api {get} /feedback/:id
 * @apiGroup Feedback
 * @apiDescription Get a user by id
 *
 * @apiParam (param) {String} feedbackID  The feedback item's ID
 *
 * @apiSuccess {Object} feedback The specified feedback item
 * @apiError FeedbackNotFound The feedback item with the given id was not found
 **/
feedback.get('/:feedbackID', (req, res, next) => {
  res.json({
    test: req.params.userID,
  })
  // mysql.query((err, users) => {
  //     if (err) return next(boom.serverUnavailable("DatabaseConnection"))
  //     res.json({ userID: users })
  // })
})

/**
 * @api {post} /feedback/new
 * @apiGroup Feedback
 * @apiDescription Create a new feedback item
 *
 * @apiParam (body) {String} user_id    The user's ID
 * @apiParam (body) {String} device_id  The device's UUID
 * @apiParam (body) {String} title      The feedback item's title
 * @apiParam (body) {String} body       The feedback item's body
 *
 * @apiSuccess {Object} feedback        The feedback item
 **/
feedback.post('/new', async (req, res, _) => {
  const user_id = requireParam(req, res, 'user_id')
  const device_id = requireParam(req, res, 'device_id')
  const title = requireParam(req, res, 'title')
  const body = requireParam(req, res, 'body')

  const feedback = {
    id: uuid(),
    user_id,
    device_id,
    timestamp: new Date().getTime(),
    title,
    body,
    upvotes: 1,
    upvote_device_ids: [device_id],
  }

  const dbRes = await db.putFeedbackItem(res, feedback)
  res.json(dbRes)
  res.end()
})

module.exports = feedback
