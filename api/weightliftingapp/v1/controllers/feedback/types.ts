export type DynamoDbStringSet = AWS.DynamoDB.DocumentClient.StringSet
export type StringSet = string[] | DynamoDbStringSet

export enum FeedbackType {
  SUGGESTION = 0,
  BUG = 1,
}

export enum FeedbackStatus {
  OPEN = 0,
  PLANNED = 10,
  WIP = 11,
  DONE = 21,
  CLOSED = 100,
}

export type Feedback = {
  id: string // (Primary) partition key
  user_id: string
  device_id: string
  email: string
  timestamp: number
  app_version: string
  ftype: FeedbackType // (GSI ftype-upvotes-index) partition key
  title: string
  body: string
  fstatus: FeedbackStatus
  upvotes: number // (GSI ftype-upvotes-index) sort key
  upvote_device_ids?: StringSet
  user_did_upvote?: boolean
}

export const FeedbackQueryFields = [
  'id',
  'user_id',
  'device_id',
  'email',
  'timestamp',
  'app_version',
  'ftype',
  'title',
  'body',
  'fstatus',
  'upvotes',
  'upvote_device_ids',
]

export const FeedbackAllFields = [
  'id',
  'user_id',
  'device_id',
  'email',
  'timestamp',
  'app_version',
  'ftype',
  'title',
  'body',
  'fstatus',
  'upvotes',
  'upvote_device_ids',
]
