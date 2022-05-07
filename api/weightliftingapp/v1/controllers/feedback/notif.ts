import * as t from './types'
import util = require('#util')

async function notifyDevsNewFeedbackItem(feedback: t.Feedback) {
  return await util.apns.sendInternalNotifToDevs(
    {
      title:
        feedback.ftype === t.FeedbackType.SUGGESTION ? 'New Feature Suggestion' : 'New Bug Report',
      body: `'${feedback.title}' by user '${feedback.user_id}'`,
    },
    {
      feedback_id: feedback.id,
    }
  )
}

export = {
  notifyDevsNewFeedbackItem,
}
