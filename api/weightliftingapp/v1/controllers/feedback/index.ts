import express = require('express')
const feedback = express.Router()
import util = require('../../util')
import db = require('./db')
import notif = require('./notif')
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
 * @apiParam (body) {String} ftype       The feedback type to get
 * @apiParam (body) {String} limit       OPTIONAL: The res item limit (default = 25)
 * @apiParam (body) {String} start_key   OPTIONAL: The last_key of the last query
 *
 * @apiSuccess { items: Feedback[] }     The feedback items matching the query
 **/
feedback.post(
  '/',
  util.wrap(async (req: any, res: any) => {
    const ftype: number = util.require.body(req, 'ftype')
    const limit: number = req.body['limit'] ?? 25
    const startKey: Object | undefined = req.body['start_key']
    const dbRes = await db.queryFeedbackItems(ftype, limit, startKey)
    res.json({
      items: dbRes.items,
      last_key: dbRes.lastKey,
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
    const ftype: number = util.require.body(req, 'ftype')
    const user_id: string = util.require.body(req, 'user_id')
    const device_id: string = util.require.body(req, 'device_id')
    const app_version: number = util.require.body(req, 'app_version')
    const email: string = util.require.body(req, 'email')
    const title: string = util.require.body(req, 'title')
    const body: string = util.require.body(req, 'body')

    const feedback: t.Feedback = {
      ftype,
      id: util.uuid(),
      user_id,
      device_id,
      app_version,
      email,
      timestamp: util.timestamp(),
      title,
      body,
      fstatus: t.FeedbackStatus.OPEN,
      upvotes: 1,
      upvote_device_ids: db.stringSet([device_id]),
    }

    const dbRes = await db.putFeedbackItem(feedback)

    // send notifs to devs in background (no await)
    notif.notifyDevsNewFeedbackItem(feedback)

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
 * @apiParam (param) {String} id         The feedback item ID
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
 * @apiParam (param) {String} id         The feedback item ID
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
 * @api {post} /feedback/:id/status
 * @apiGroup Feedback
 * @apiDescription (INTERNAL) Update the status of a feedback item
 *
 * @apiParam (param) {String} id         The feedback item ID
 * @apiParam (body) {String} status      The updated feedback item status
 *
 * @apiSuccess { item: Feedback }        The updated feedback item
 **/
feedback.post(
  '/:feedbackID/status',
  util.wrap(async (req: any, res: any) => {
    console.log(req.headers)
    util.access.enforceInternalUser(req)
    const feedback_id: string = util.require.param(req, 'feedbackID')
    const status: number = util.require.body(req, 'status')
    const dbRes = await db.updateStatusFeedbackItem(feedback_id, status)
    res.json({
      item: dbRes.item,
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
