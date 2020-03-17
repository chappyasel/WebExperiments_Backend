const aws = require('../util/aws')
const keys = require('../util/aws/keys')

type Feedback = {
  id: String
  user_id: String
  device_id: String
  timestamp: Number
  title: String
  body: String
  upvotes: Number
  upvote_device_ids: String[]
}

type FeedbackQuery = {
  success: Boolean
  items: Feedback[]
}

async function putFeedbackItem(res: any, feedback: Feedback) {
  return await aws.dynamodb.put(res, keys.TABLES.FEEDBACK_TABLE, feedback)
}

async function getFeedbackItem(res: any, id: String): Promise<Feedback> {
  return await aws.dynamodb.get(res, keys.TABLES.FEEDBACK_TABLE, 'id', id)
}

async function queryFeedbackItems(res: any): Promise<FeedbackQuery> {
  return await aws.dynamodb.query(res, keys.TABLES.FEEDBACK_TABLE)
}

module.exports = {
  putFeedbackItem,
  getFeedbackItem,
  queryFeedbackItems,
}
