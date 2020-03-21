import boom = require('boom')
import util = require('../../util')
import * as t from './types'

const FEEDBACK_TABLE = 'benchTrackerFeedback'

async function queryFeedbackItems(
  ftype: t.FeedbackType,
  limit: number,
  startKey?: Object
) {
  return await util.aws.dynamodb.query(FEEDBACK_TABLE, {
    index: 'ftype-upvotes-index',
    conditionExpression: 'ftype = :ftype',
    expressionValues: { ':ftype': ftype },
    limit: limit,
    startKey,
  })
}

async function getFeedbackItem(id: string) {
  return await util.aws.dynamodb.get(FEEDBACK_TABLE, { id: id })
}

async function putFeedbackItem(feedback: t.Feedback) {
  return await util.aws.dynamodb.put(FEEDBACK_TABLE, feedback)
}

async function upvoteFeedbackItem(id: string, deviceID: string) {
  return await util.aws.dynamodb.update(
    FEEDBACK_TABLE,
    { id: id },
    'ADD upvote_device_ids :dss, upvotes :inc',
    { ':inc': 1, ':did': deviceID, ':dss': toStringSet([deviceID]) },
    'NOT contains(upvote_device_ids, :did)'
  )
}

async function clearVoteFeedbackItem(id: string, deviceID: string) {
  return await util.aws.dynamodb.update(
    FEEDBACK_TABLE,
    { id: id },
    'DELETE upvote_device_ids :dss  ADD upvotes :inc',
    { ':inc': -1, ':did': deviceID, ':dss': toStringSet([deviceID]) },
    'contains(upvote_device_ids, :did)'
  )
}

async function updateStatusFeedbackItem(id: string, fstatus: number) {
  return await util.aws.dynamodb.update(
    FEEDBACK_TABLE,
    { id: id },
    'SET fstatus = :fstatus',
    { ':fstatus': fstatus }
  )
}

async function deleteFeedbackItem(id: string) {
  return await util.aws.dynamodb.delete(FEEDBACK_TABLE, { id: id })
}

function convertFeedbackToUserDidUpvote(
  deviceID: string,
  feedback: t.Feedback
) {
  if (feedback.upvote_device_ids === undefined)
    throw boom.internal('error converting feedback to user did upvote type')
  feedback.user_did_upvote = setContainsUser(
    feedback.upvote_device_ids,
    deviceID
  )
  delete feedback.upvote_device_ids
}

function setContainsUser(set: t.StringSet, deviceID: string): boolean {
  if (Array.isArray(set)) return set.includes(deviceID)
  return set.values.includes(deviceID)
}

function toStringSet(arr: string[]): t.DynamoDbStringSet {
  return <t.DynamoDbStringSet>util.aws.dynamodb.stringSet(arr)
}

export = {
  queryFeedbackItems,
  getFeedbackItem,
  putFeedbackItem,
  upvoteFeedbackItem,
  clearVoteFeedbackItem,
  updateStatusFeedbackItem,
  deleteFeedbackItem,
  convertFeedbackToUserDidUpvote,
  toStringSet,
}
