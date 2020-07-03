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
 * @apiParam (body) {String} ftype          The feedback type to get
 * @apiParam (body) {String} limit          OPTIONAL: The res item limit (default = 20)
 * @apiParam (body) {FeedbackKey} start_key OPTIONAL: The last_key of the last query
 *
 * @apiSuccess { items: Feedback[] }        The feedback items matching the query
 **/
feedback.post(
  '/',
  util.wrap(async (req: any, res: any) => {
    const ftype: number = util.require.body(req, 'ftype')
    const limit: number = req.body['limit'] ?? 20
    const startKey: t.FeedbackKey | undefined = req.body['start_key']

    const dbRes = await db.queryFeedbackItems(ftype, limit, startKey)
    const deviceID = util.access.deviceID(req)
    dbRes.items.map(f =>
      db.convertFeedbackToUserDidUpvote(deviceID, <t.Feedback>f)
    )

    res.json({
      items: dbRes.items,
      last_key: dbRes.lastKey ?? null,
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
    const fields = util.access.isInternalUser(req)
      ? t.FeedbackFieldsAllInternal
      : t.FeedbackFieldsAll
    const dbRes = await db.getFeedbackItem(feedbackID, fields)
    if (dbRes.item !== null) {
      const deviceID = util.access.deviceID(req)
      db.convertFeedbackToUserDidUpvote(deviceID, <t.Feedback>dbRes.item)
    }

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
 * @apiParam (body) {Number} ftype      Feedback type (bug, suggestion)
 * @apiParam (body) {String} user_id    The user's ID
 * @apiParam (body) {String} email      The user's email
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
    const device_id: string = util.access.deviceID(req)
    const app_version: string = util.access.appVersion(req)
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
      ftimestamp: util.timestamp(),
      title,
      body,
      fstatus: t.FeedbackStatus.OPEN,
      upvotes: 1,
      upvote_device_ids: db.toStringSet([device_id]),
    }

    const dbRes = await db.putFeedbackItem(feedback)
    db.convertFeedbackToUserDidUpvote(device_id, <t.Feedback>dbRes.item)

    // send notifs to devs in background (no await)
    notif.notifyDevsNewFeedbackItem(feedback)

    res.json({
      item: dbRes.item,
    })
  })
)

/**
 * @api {post} /feedback/:id/vote/:type(upvote|clear)
 * @apiGroup Feedback
 * @apiDescription Modift a user's vote for a feedback item
 *
 * @apiParam (param) {String} id         The feedback item ID
 * @apiParam (param) {String} type       The vote modification to be made
 *
 * @apiSuccess { updated: bool }         Whether or not the item was updated
 **/
feedback.post(
  '/:feedbackID/vote/:voteType(upvote|clear)',
  util.wrap(async (req: any, res: any) => {
    const vote_type: string = util.require.param(req, 'voteType')
    const feedback_id: string = util.require.param(req, 'feedbackID')
    const device_id: string = util.access.deviceID(req)

    var dbRes = null
    if (vote_type === 'upvote')
      dbRes = await db.upvoteFeedbackItem(feedback_id, device_id)
    else dbRes = await db.clearVoteFeedbackItem(feedback_id, device_id)

    res.json({
      updated: dbRes.updated,
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
 * @apiSuccess { updated: bool }         Whether or not the item was updated
 **/
feedback.post(
  '/:feedbackID/status',
  util.wrap(async (req: any, res: any) => {
    console.log(req.headers)
    util.access.enforceInternalUser(req)
    const feedback_id: string = util.require.param(req, 'feedbackID')
    const status: number = util.require.body(req, 'status')

    const dbRes = await db.updateStatusFeedbackItem(feedback_id, status)
    if (dbRes.item !== null) {
      const deviceID = util.access.deviceID(req)
      db.convertFeedbackToUserDidUpvote(deviceID, <t.Feedback>dbRes.item)
    }

    res.json({
      updated: dbRes.updated,
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
