import boom = require('boom')
import AWS = require('aws-sdk')
import keys = require('../keys')
import e = require('express')
AWS.config.update(keys.AWS_REMOTE_CONFIG)
const db = new AWS.DynamoDB.DocumentClient()

type Item = Object

type DynamoDbSet = AWS.DynamoDB.DocumentClient.DynamoDbSet

type PutResponse = {
  item: Item
}

type GetResponse = {
  item: Item | null
}

type UpdateResponse = {
  updated: boolean
  item: Item | null
}

type QueryResponse = {
  items: Item[]
}

async function put(res: any, table: string, item: Item): Promise<PutResponse> {
  const params = {
    TableName: table,
    Item: item,
  }

  try {
    await db.put(params).promise()
    return {
      item,
    }
  } catch (error) {
    res.json(
      boom.serverUnavailable(`AWS DynamoDB 'put' server error: '${error}'`)
    )
    return Promise.reject(error)
  }
}

async function get(
  res: any,
  table: string,
  keyName: string,
  keyID: any
): Promise<GetResponse> {
  const params = {
    TableName: table,
    KeyConditionExpression: `${keyName} = :id`,
    ExpressionAttributeValues: {
      ':id': keyID,
    },
  }

  try {
    const dbRes = await db.query(params).promise()
    const { Items } = dbRes
    return {
      item: Items ? Items[0] : null,
    }
  } catch (error) {
    res.json(
      boom.serverUnavailable(`AWS DynamoDB 'get' server error: '${error}'`)
    )
    return Promise.reject(error)
  }
}

async function query(res: any, table: string): Promise<QueryResponse> {
  const params = {
    TableName: table,
  }

  try {
    const dbRes = await db.scan(params).promise()
    const { Items } = dbRes
    return {
      items: Items ?? [],
    }
  } catch (error) {
    res.json(
      boom.serverUnavailable(`AWS DynamoDB 'query' server error: '${error}'`)
    )
    return Promise.reject(error)
  }
}

async function update(
  res: any,
  table: string,
  key: Object,
  updateExpression: string,
  expressionValues: Object,
  conditionExpression?: string
): Promise<UpdateResponse> {
  const params = {
    TableName: table,
    Key: key,
    ConditionExpression: conditionExpression,
    UpdateExpression: updateExpression,
    ExpressionAttributeValues: expressionValues,
    ReturnValues: 'ALL_NEW',
  }
  try {
    const dbRes = await db.update(params).promise()
    const { Attributes } = dbRes
    return {
      updated: true,
      item: Attributes ? Attributes : null,
    }
  } catch (error) {
    if (error.code === 'ConditionalCheckFailedException') {
      return {
        updated: false,
        item: null,
      }
    }
    res.json(
      boom.serverUnavailable(`AWS DynamoDB 'update' server error: '${error}'`)
    )
    return Promise.reject(error)
  }
}

function stringSet(arr: string[]): DynamoDbSet {
  return db.createSet(arr)
}

export = {
  put,
  get,
  query,
  update,
  stringSet,
}
