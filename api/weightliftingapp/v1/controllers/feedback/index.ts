import express = require('express')
const feedback = express.Router()
import util = require('../../util')
import db = require('./db')
import * as t from './types'

// MARK - child routes
feedback.use(
  '/:feedbackID/comments',
  (req: any, _: any, next: any) => {
    req.feedback_id = util.require.param(req, 'feedbackID')
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
feedback.post(
  '/',
  util.wrap(async (req: any, res: any) => {
    const dbRes = await db.queryFeedbackItems()
    res.json({
      items: dbRes.items,
    })
  })
)

/**
 * @api {get} /feedback/:id
 * @apiGroup Feedback
 * @apiDescription Get a feedback item by ID
 *
 * @apiParam (param) {String} id         The feedback item ID to get
 *
 * @apiSuccess { item: Feedback }        The specified feedback item
 **/
feedback.get(
  '/:feedbackID',
  util.wrap(async (req: any, res: any) => {
    const feedbackID: string = util.require.param(req, 'feedbackID')
    const dbRes = await db.getFeedbackItem(feedbackID)
    res.json({
      item: dbRes.item ?? null,
    })
  })
)

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
feedback.post(
  '/new',
  util.wrap(async (req: any, res: any) => {
    const user_id: string = util.require.body(req, 'user_id')
    const device_id: string = util.require.body(req, 'device_id')
    const email: string = util.require.body(req, 'email')
    const title: string = util.require.body(req, 'title')
    const body: string = util.require.body(req, 'body')

    const feedback: t.Feedback = {
      id: util.uuid(),
      user_id,
      device_id,
      email,
      timestamp: new Date().getTime(),
      type: t.FeedbackType.SUGGESTION,
      title,
      body,
      status: t.FeedbackStatus.OPEN,
      upvotes: 1,
      upvote_device_ids: db.stringSet([device_id]),
    }

    const dbRes = await db.putFeedbackItem(feedback)
    await util.apns.sendInternalNotifToDevs()
    res.json({
      item: dbRes.item,
    })
  })
)

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
feedback.post(
  '/:feedbackID/vote/upvote',
  util.wrap(async (req: any, res: any) => {
    const feedback_id: string = util.require.param(req, 'feedbackID')
    const device_id: string = util.require.body(req, 'device_id')
    const dbRes = await db.upvoteFeedbackItem(feedback_id, device_id)
    res.json({
      updated: dbRes.updated,
      item: dbRes.item ?? null,
    })
  })
)

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
feedback.post(
  '/:feedbackID/vote/clear',
  util.wrap(async (req: any, res: any) => {
    const feedback_id: string = util.require.param(req, 'feedbackID')
    const device_id: string = util.require.body(req, 'device_id')
    const dbRes = await db.clearVoteFeedbackItem(feedback_id, device_id)
    res.json({
      updated: dbRes.updated,
      item: dbRes.item ?? null,
    })
  })
)

/**
 * @api {post} /feedback/:id/delete
 * @apiGroup Feedback
 * @apiDescription (INTERNAL) Delete a feedback item
 *
 * @apiParam (param) {String} id         The feedback item ID to delete
 *
 * @apiSuccess { deleted: boolean }      Whether or not the item was deleted
 **/
feedback.post(
  '/:feedbackID/delete',
  util.wrap(async (req: any, res: any) => {
    util.access.enforceInternalUser(req)
    const feedback_id: string = util.require.param(req, 'feedbackID')
    const dbRes = await db.deleteFeedbackItem(feedback_id)
    res.json({
      deleted: dbRes.deleted,
    })
  })
)

export = feedback
