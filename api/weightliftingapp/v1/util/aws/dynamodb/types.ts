export type Item = Object

export type DynamoDbSet = AWS.DynamoDB.DocumentClient.DynamoDbSet

export type PutResponse = {
  item: Item
}

export type GetResponse = {
  item: Item | null
}

export type UpdateResponse = {
  updated: boolean
  item: Item | null
}

export type QueryResponse = {
  items: Item[]
}

export type DeleteResponse = {
  deleted: boolean
}
