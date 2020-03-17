import aws = require('../util/aws')
import * as t from './types'

const FEEDBACK_TABLE = 'benchTrackerFeedback'

async function putFeedbackItem(res: any, feedback: t.Feedback) {
  return await aws.dynamodb.put(res, FEEDBACK_TABLE, feedback)
}

async function getFeedbackItem(res: any, id: string) {
  return await aws.dynamodb.get(res, FEEDBACK_TABLE, 'id', id)
}

async function queryFeedbackItems(res: any) {
  return await aws.dynamodb.query(res, FEEDBACK_TABLE)
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

function stringSet(arr: string[]): t.DynamoDbSet {
  return aws.dynamodb.stringSet(arr)
}

export = {
  putFeedbackItem,
  getFeedbackItem,
  queryFeedbackItems,
  upvoteFeedbackItem,
  stringSet,
}
