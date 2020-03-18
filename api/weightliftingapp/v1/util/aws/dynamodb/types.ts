export type Item = Object
export type DynamoDbSet = AWS.DynamoDB.DocumentClient.DynamoDbSet
export type Key = AWS.DynamoDB.DocumentClient.Key

export type QueryParams = {
  index?: string
  conditionExpression: string
  expressionValues: Object
  order_asc?: boolean
  limit?: number
  startKey?: Key
}

export type QueryResponse = {
  items: Item[]
  lastKey: Key | null
}

export type GetResponse = {
  item: Item | null
}

export type PutResponse = {
  item: Item
}

export type UpdateResponse = {
  updated: boolean
  item: Item | null
}

export type DeleteResponse = {
  deleted: boolean
}
