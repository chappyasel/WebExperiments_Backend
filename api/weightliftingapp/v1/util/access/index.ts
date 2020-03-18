import boom = require('boom')
import keys = require('./keys')

function isInternalUser(req: any) {
  if (req.header('internal') === undefined) return false
  const internal_did = req.header('internal-device-id')
  return (
    internal_did !== undefined && keys.INTERNAL_DEVICE_IDS.has(internal_did)
  )
}

function enforceInternalUser(req: any) {
  if (isInternalUser(req)) return true
  throw boom.forbidden('endpoint enforced internal user check failed')
}

export = {
  isInternalUser,
  enforceInternalUser,
}
