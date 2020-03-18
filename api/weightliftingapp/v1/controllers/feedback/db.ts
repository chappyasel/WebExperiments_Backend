import aws = require('../../util/aws')
import * as t from './types'

const FEEDBACK_TABLE = 'benchTrackerFeedback'

async function queryFeedbackItems(res: any) {
  return await aws.dynamodb.query(res, FEEDBACK_TABLE)
}

async function getFeedbackItem(res: any, id: string) {
  return await aws.dynamodb.get(res, FEEDBACK_TABLE, 'id', id)
}

async function putFeedbackItem(res: any, feedback: t.Feedback) {
  return await aws.dynamodb.put(res, FEEDBACK_TABLE, feedback)
}

async function upvoteFeedbackItem(res: any, id: string, deviceID: string) {
  return await aws.dynamodb.update(
    res,
    FEEDBACK_TABLE,
    { id: id },
    'ADD upvote_device_ids :dss, upvotes :inc',
    { ':inc': 1, ':did': deviceID, ':dss': stringSet([deviceID]) },
    'NOT contains(upvote_device_ids, :did)'
  )
}

async function clearVoteFeedbackItem(res: any, id: string, deviceID: string) {
  return await aws.dynamodb.update(
    res,
    FEEDBACK_TABLE,
    { id: id },
    'DELETE upvote_device_ids :dss  ADD upvotes :inc',
    { ':inc': -1, ':did': deviceID, ':dss': stringSet([deviceID]) },
    'contains(upvote_device_ids, :did)'
  )
}

function stringSet(arr: string[]): t.DynamoDbSet {
  return aws.dynamodb.stringSet(arr)
}

export = {
  queryFeedbackItems,
  getFeedbackItem,
  putFeedbackItem,
  upvoteFeedbackItem,
  clearVoteFeedbackItem,
  stringSet,
}
