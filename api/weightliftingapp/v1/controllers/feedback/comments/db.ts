import util = require('../../../../../util')
import * as t from './types'

const COMMENT_TABLE = 'benchTrackerFeedbackComments'

async function queryCommentItems() {
  return await util.aws.dynamodb.query(COMMENT_TABLE, {
    conditionExpression: '',
    expressionValues: '',
  })
}

async function putCommentItem(comment: t.Comment) {
  return await util.aws.dynamodb.put(COMMENT_TABLE, comment)
}

export = {
  queryCommentItems,
  putCommentItem,
}
