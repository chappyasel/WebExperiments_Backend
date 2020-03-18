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
  id: string
  user_id: string
  device_id: string
  email: string
  timestamp: number
  type: FeedbackType
  title: string
  body: string
  status: FeedbackStatus
  upvotes: number
  upvote_device_ids: string[] | DynamoDbSet
}

export type FeedbackQuery = {
  success: boolean
  items: Feedback[]
}
