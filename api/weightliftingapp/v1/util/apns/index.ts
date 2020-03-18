import apn = require('apn')
import keys = require('./keys')

const options = {
  token: {
    keyId: keys.KEY_ID,
    teamId: keys.TEAM_ID,
    key: keys.KEY_CERT,
  },
  production: false,
}

async function sendInternalNotifToDevs() {
  const apnProvider = new apn.Provider(options)

  const notif = new apn.Notification()
  notif.topic = keys.BUNDLE_IDS.INTERNAL
  notif.expiry = Math.floor(Date.now() / 1000) + 3600
  notif.sound = 'ping.aiff'
  notif.alert = {
    title: 'title',
    body: 'body asdasdasdasd sd ad as das d asd as das d as',
  }
  notif.payload = { feedback_id: '1234567890' }

  try {
    const res = await apnProvider.send(notif, keys.DEV_DEVICE_TOKENS)
    apnProvider.shutdown()
    return res
  } catch (error) {
    apnProvider.shutdown()
    return Promise.reject(error)
  }
}

export = {
  sendInternalNotifToDevs,
}
