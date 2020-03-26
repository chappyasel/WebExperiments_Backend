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

export interface Feedback {
  id: string // (Primary) partition key
  user_id: string
  device_id: string
  email?: string
  ftimestamp: number
  app_version?: string
  ftype: FeedbackType // (GSI ftype-upvotes-index) partition key
  title: string
  body?: string
  fstatus: FeedbackStatus
  upvotes: number // (GSI ftype-upvotes-index) sort key
  upvote_device_ids?: StringSet
  user_did_upvote?: boolean
}

export type FeedbackKeys = keyof Feedback

export const FeedbackFieldsQuery: FeedbackKeys[] = [
  'id',
  'user_id',
  'device_id',
  'ftimestamp',
  'ftype',
  'title',
  'fstatus',
  'upvotes',
  'upvote_device_ids',
]

export const FeedbackFieldsAll: FeedbackKeys[] = [
  'id',
  'user_id',
  'device_id',
  'ftimestamp',
  'ftype',
  'title',
  'body',
  'fstatus',
  'upvotes',
  'upvote_device_ids',
]

export const FeedbackFieldsAllInternal = FeedbackFieldsAll.concat([
  'app_version',
  'email',
])
