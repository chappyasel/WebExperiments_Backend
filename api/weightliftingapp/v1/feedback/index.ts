import express = require('express')
const feedback = express.Router()
const { requireParam, requireBody } = require('../util')
import db = require('./db')
import * as t from './types'
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
feedback.post('/', async (req: any, res: any) => {
  const dbRes = await db.queryFeedbackItems(res)
  res.json({
    items: dbRes.items,
  })
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
feedback.get('/:feedbackID', async (req: any, res: any) => {
  const feedback_id: string = requireParam(req, res, 'feedbackID')
  const dbRes = await db.getFeedbackItem(res, feedback_id)
  res.json({
    item: dbRes.item,
  })
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
feedback.post('/new', async (req: any, res: any) => {
  const user_id: string = requireBody(req, res, 'user_id')
  const device_id: string = requireBody(req, res, 'device_id')
  const title: string = requireBody(req, res, 'title')
  const body: string = requireBody(req, res, 'body')

  const feedback: t.Feedback = {
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
  res.json({
    item: dbRes.item,
  })
})

export = feedback
