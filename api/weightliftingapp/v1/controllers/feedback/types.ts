export type DynamoDbSet = AWS.DynamoDB.DocumentClient.DynamoDbSet

export enum FeedbackType {
  SUGGESTION = 0,
  BUG = 1,
}

export enum FeedbackStatus {
  OPEN = 0,
  CLOSED = 1,
  PLANNED = 2,
  WIP = 3,
  DONE = 4,
  RELEASED = 5,
}

export type Feedback = {
  id: string // (Primary) partition key
  user_id: string
  device_id: string
  email: string
  timestamp: number
  ftype: FeedbackType // (GSI ftype-upvotes-index) partition key
  title: string
  body: string
  fstatus: FeedbackStatus
  upvotes: number // (GSI ftype-upvotes-index) sort key
  upvote_device_ids: string[] | DynamoDbSet
}
