const boom = require('boom')
const AWS = require('aws-sdk')
const keys = require('./keys')
AWS.config.update(keys.AWS_REMOTE_CONFIG)
const db = new AWS.DynamoDB.DocumentClient()

async function upload(res, table, item) {
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
    res.json(boom.serverUnavailable(`AWS DynamoDB server error: '${err}'`))
    return {
      success: false,
      error,
    }
  }
}

module.exports = {
  upload,
}
