import boom = require('boom')
import AWS = require('aws-sdk')
import keys = require('../keys')
AWS.config.update(keys.AWS_REMOTE_CONFIG)
const db = new AWS.DynamoDB.DocumentClient()

async function put(res: any, table: string, item: Object) {
  const params = {
    TableName: table,
    Item: item,
  }

  try {
    await db.put(params).promise()
    return {
      success: true,
      item,
    }
  } catch (error) {
    res.json(
      boom.serverUnavailable(`AWS DynamoDB 'put' server error: '${error}'`)
    )
    return {
      success: false,
      error,
    }
  }
}

async function get(res: any, table: string, keyName: string, keyID: any) {
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
      success: true,
      item: Items ? Items[0] : null,
    }
  } catch (error) {
    res.json(
      boom.serverUnavailable(`AWS DynamoDB 'get' server error: '${error}'`)
    )
    return {
      success: false,
      error,
    }
  }
}

async function query(res: any, table: string) {
  const params = {
    TableName: table,
  }

  try {
    const dbRes = await db.scan(params).promise()
    const { Items } = dbRes
    return {
      success: true,
      items: Items,
    }
  } catch (error) {
    res.json(
      boom.serverUnavailable(`AWS DynamoDB 'query' server error: '${error}'`)
    )
    return {
      success: false,
      error,
    }
  }
}

export = {
  put,
  get,
  query,
}
