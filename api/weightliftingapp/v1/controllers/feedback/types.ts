export type DynamoDbSet = AWS.DynamoDB.DocumentClient.DynamoDbSet

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
  app_version: number
  ftype: FeedbackType // (GSI ftype-upvotes-index) partition key
  title: string
  body: string
  fstatus: FeedbackStatus
  upvotes: number // (GSI ftype-upvotes-index) sort key
  upvote_device_ids: string[] | DynamoDbSet
}
