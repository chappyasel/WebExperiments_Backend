import aws = require('../util/aws')
import keys = require('../util/aws/keys')
import * as t from './types'

async function putFeedbackItem(res: any, feedback: t.Feedback) {
  return await aws.dynamodb.put(res, keys.TABLES.FEEDBACK_TABLE, feedback)
}

async function getFeedbackItem(res: any, id: string): Promise<t.Feedback> {
  return await aws.dynamodb.get(res, keys.TABLES.FEEDBACK_TABLE, 'id', id)
}

async function queryFeedbackItems(res: any): Promise<t.FeedbackQuery> {
  return await aws.dynamodb.query(res, keys.TABLES.FEEDBACK_TABLE)
}

export = {
  putFeedbackItem,
  getFeedbackItem,
  queryFeedbackItems,
}
