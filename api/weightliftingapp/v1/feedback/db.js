const aws = require('../util/aws')
const keys = require('../util/aws/keys')

async function putFeedbackItem(res, feedback) {
  return await aws.upload(res, keys.TABLES.FEEDBACK_TABLE, feedback)
}

module.exports = {
  putFeedbackItem,
}
