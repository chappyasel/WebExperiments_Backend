import boom = require('boom')
import AWS = require('aws-sdk')
import * as t from './types'
import keys = require('../keys')
AWS.config.update(keys.AWS_REMOTE_CONFIG)
const db = new AWS.DynamoDB.DocumentClient()

async function queryItems(
  table: string,
  params: t.QueryParams
): Promise<t.QueryResponse> {
  try {
    const dbRes = await db
      .query({
        TableName: table,
        IndexName: params.index,
        KeyConditionExpression: params.conditionExpression,
        ExpressionAttributeValues: params.expressionValues,
        Limit: params.limit,
        ScanIndexForward: params.order_asc ?? false,
        ExclusiveStartKey: params.startKey,
      })
      .promise()
    const { Items, LastEvaluatedKey } = dbRes
    return {
      items: Items ?? [],
      lastKey: LastEvaluatedKey ?? null,
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
  try {
    const dbRes = await db
      .query({
        TableName: table,
        KeyConditionExpression: `${keyName} = :id`,
        ExpressionAttributeValues: {
          ':id': keyID,
        },
      })
      .promise()
    const { Items } = dbRes
    return {
      item: Items ? Items[0] : null,
    }
  } catch (err) {
    throw boom.serverUnavailable(`AWS DynamoDB 'get' server err: '${err}'`)
  }
}

async function putItem(table: string, item: t.Item): Promise<t.PutResponse> {
  try {
    await db
      .put({
        TableName: table,
        Item: item,
      })
      .promise()
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
  try {
    const dbRes = await db
      .update({
        TableName: table,
        Key: key,
        ConditionExpression: conditionExpression,
        UpdateExpression: updateExpression,
        ExpressionAttributeValues: expressionValues,
        ReturnValues: 'ALL_NEW',
      })
      .promise()
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
  try {
    const dbRes = await db
      .delete({
        TableName: table,
        Key: key,
        ConditionExpression: conditionExpression,
        ExpressionAttributeValues: expressionValues,
        ReturnValues: 'ALL_OLD',
      })
      .promise()
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
