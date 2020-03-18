export type DynamoDbSet = AWS.DynamoDB.DocumentClient.DynamoDbSet

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
  timestamp: number
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
