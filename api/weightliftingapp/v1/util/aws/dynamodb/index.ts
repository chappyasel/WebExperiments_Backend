import boom = require('boom')
import AWS = require('aws-sdk')
import * as t from './types'
import keys = require('../keys')
AWS.config.update(keys.AWS_REMOTE_CONFIG)
const db = new AWS.DynamoDB.DocumentClient()

async function queryItems(table: string): Promise<t.QueryResponse> {
  const params = {
    TableName: table,
  }

  try {
    const dbRes = await db.scan(params).promise()
    const { Items } = dbRes
    return {
      items: Items ?? [],
    }
  } catch (err) {
    throw boom.serverUnavailable(`AWS DynamoDB 'query' server err: '${err}'`)
  }
}

async function getItem(
  table: string,
  keyName: string,
  keyID: any
): Promise<t.GetResponse> {
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
  } catch (err) {
    throw boom.serverUnavailable(`AWS DynamoDB 'get' server err: '${err}'`)
  }
}

async function putItem(table: string, item: t.Item): Promise<t.PutResponse> {
  const params = {
    TableName: table,
    Item: item,
  }

  try {
    await db.put(params).promise()
    return {
      item,
    }
  } catch (err) {
    throw boom.serverUnavailable(`AWS DynamoDB 'put' server err: '${err}'`)
  }
}

async function updateItem(
  table: string,
  key: Object,
  updateExpression: string,
  expressionValues: Object,
  conditionExpression?: string
): Promise<t.UpdateResponse> {
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
  } catch (err) {
    if (err.code === 'ConditionalCheckFailedException') {
      return {
        updated: false,
        item: null,
      }
    }
    throw boom.serverUnavailable(`AWS DynamoDB 'update' server err: '${err}'`)
  }
}

async function deleteItem(
  table: string,
  key: Object,
  expressionValues?: Object,
  conditionExpression?: string
): Promise<t.DeleteResponse> {
  const params = {
    TableName: table,
    Key: key,
    ConditionExpression: conditionExpression,
    ExpressionAttributeValues: expressionValues,
    ReturnValues: 'ALL_OLD',
  }

  try {
    const dbRes = await db.delete(params).promise()
    return {
      deleted: dbRes.Attributes !== undefined,
    }
  } catch (err) {
    throw boom.serverUnavailable(`AWS DynamoDB 'delete' server err: '${err}'`)
  }
}

function stringSet(arr: string[]): t.DynamoDbSet {
  return db.createSet(arr)
}

export = {
  query: queryItems,
  get: getItem,
  put: putItem,
  update: updateItem,
  delete: deleteItem,
  stringSet,
}
