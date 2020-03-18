import aws = require('../../../util/aws')
import * as t from './types'

const COMMENT_TABLE = 'benchTrackerFeedbackComments'

async function queryCommentItems(res: any) {
  return await aws.dynamodb.query(res, COMMENT_TABLE)
}

async function putCommentItem(res: any, comment: t.Comment) {
  return await aws.dynamodb.put(res, COMMENT_TABLE, comment)
}

export = {
  queryCommentItems,
  putCommentItem,
}
