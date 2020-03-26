import boom = require('boom')
import keys = require('./keys')
import compareVersions = require('compare-versions')

function deviceID(req: any): string {
  if (req.header(keys.HEADERS.DEVICE_ID) === undefined)
    throw boom.preconditionRequired(
      'endpoint device id check failed: missing header'
    )
  return req.header(keys.HEADERS.DEVICE_ID)
}

function appVersion(req: any): string {
  if (req.header(keys.HEADERS.APP_VERSION) === undefined)
    throw boom.preconditionRequired(
      'endpoint app version check failed: missing header'
    )
  return req.header(keys.HEADERS.APP_VERSION)
}

function enforceAppVersion(req: any, enforceV: string): boolean {
  const version = appVersion(req)
  if (compareVersions(version, enforceV) >= 0) return true
  throw boom.preconditionFailed(
    `endpoint enforced app version check failed. ` +
      `${version} (given) < ${enforceV} (expected)`
  )
}

function isInternalUser(req: any): boolean {
  if (req.header(keys.HEADERS.INTERNAL) === undefined) return false
  const internal_did = req.header(keys.HEADERS.DEVICE_ID)
  return (
    internal_did !== undefined && keys.INTERNAL_DEVICE_IDS.has(internal_did)
  )
}

function enforceInternalUser(req: any): boolean {
  if (isInternalUser(req)) return true
  throw boom.preconditionFailed('endpoint enforced internal user check failed')
}

export = {
  deviceID,
  appVersion,
  enforceAppVersion,
  isInternalUser,
  enforceInternalUser,
}
