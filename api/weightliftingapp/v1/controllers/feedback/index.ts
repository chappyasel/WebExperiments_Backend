const feedback = require('express').Router()
const { requireParam, requireBody } = require('../../util')
import db = require('./db')
import * as t from './types'
const { v4: uuid } = require('uuid')
import apns = require('../../util/apns')

// MARK - child routes
feedback.use(
  '/:feedbackID/comments',
  (req: any, res: any, next: any) => {
    req.feedback_id = requireParam(req, res, 'feedbackID')
    next()
  },
  require('./comments')
)

/**
 * @api {post} /feedback
 * @apiGroup Feedback
 * @apiDescription Query feedback items
 *
 * @apiSuccess { items: Feedback[] }     The users matching the query
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
 * @apiDescription Get a feedback item by ID
 *
 * @apiParam (param) {String} id         The feedback item ID to get
 *
 * @apiSuccess { item: Feedback }        The specified feedback item
 **/
feedback.get('/:feedbackID', async (req: any, res: any) => {
  const feedbackID: string = requireParam(req, res, 'feedbackID')
  const dbRes = await db.getFeedbackItem(res, feedbackID)
  res.json({
    item: dbRes.item ?? null,
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
 * @apiSuccess { item: Feedback }       The created feedback item
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
    status: t.FeedbackStatus.OPEN,
    upvotes: 1,
    upvote_device_ids: db.stringSet([device_id]),
  }

  const dbRes = await db.putFeedbackItem(res, feedback)
  await apns.sendInternalNotifToDevs()
  res.json({
    item: dbRes.item,
  })
})

/**
 * @api {post} /feedback/:id/vote/upvote
 * @apiGroup Feedback
 * @apiDescription Upvote a feedback item for a user
 *
 * @apiParam (param) {String} id         The feedback item ID to upvote
 * @apiParam (body)  {String} device_id  The device ID to use for upvoting
 *
 * @apiSuccess { updated, item }         The updated feedback item
 **/
feedback.post('/:feedbackID/vote/upvote', async (req: any, res: any) => {
  const feedback_id: string = requireParam(req, res, 'feedbackID')
  const device_id: string = requireBody(req, res, 'device_id')
  const dbRes = await db.upvoteFeedbackItem(res, feedback_id, device_id)
  res.json({
    updated: dbRes.updated,
    item: dbRes.item ?? null,
  })
})

/**
 * @api {post} /feedback/:id/vote/clear
 * @apiGroup Feedback
 * @apiDescription Clear a user's vote on a feedback item
 *
 * @apiParam (param) {String} id         The feedback item ID to clear
 * @apiParam (body)  {String} device_id  The device ID to clear the vote of
 *
 * @apiSuccess { updated, item }         The updated feedback item
 **/
feedback.post('/:feedbackID/vote/clear', async (req: any, res: any) => {
  const feedback_id: string = requireParam(req, res, 'feedbackID')
  const device_id: string = requireBody(req, res, 'device_id')
  const dbRes = await db.clearVoteFeedbackItem(res, feedback_id, device_id)
  res.json({
    updated: dbRes.updated,
    item: dbRes.item ?? null,
  })
})

export = feedback
