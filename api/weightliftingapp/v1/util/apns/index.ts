import apn = require('apn')
import boom = require('boom')
import keys = require('./keys')
import * as t from './types'

const options = {
  token: {
    keyId: keys.KEY_ID,
    teamId: keys.TEAM_ID,
    key: keys.KEY_CERT,
  },
  production: false,
}

async function sendInternalNotifToDevs(
  alert: t.NotifAlert,
  payload: Object
): Promise<t.NotifSendResponse> {
  const apnProvider = new apn.Provider(options)

  const notif = new apn.Notification()
  notif.topic = keys.BUNDLE_IDS.INTERNAL
  notif.expiry = Math.floor(Date.now() / 1000) + 3600
  notif.sound = 'ping.aiff'
  notif.alert = alert
  // @ts-ignore category is implemented but not documented
  // notif.category = category
  notif.payload = payload

  try {
    const res = await apnProvider.send(notif, keys.DEV_DEVICE_TOKENS)
    apnProvider.shutdown()
    return {
      sent: res.sent.length,
      failed: res.failed.length,
    }
  } catch (err) {
    apnProvider.shutdown()
    throw boom.failedDependency(`APNS send error: ${err}`)
  }
}

export = {
  sendInternalNotifToDevs,
}
