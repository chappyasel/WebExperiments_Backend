import boom = require('boom')

// MARK - public imports
import access = require('./access')
import apns = require('./apns')
import aws = require('./aws')
import reqRequire = require('./require')
const { v4: uuid } = require('uuid')

const wrap = (fn: any) => async (req: any, res: any, next: any) => {
  try {
    fn(req, res, next)
  } catch (err) {
    const error: any = err
    if (!error.isBoom) return next(boom.badImplementation(error))
    next(error)
  }
}

const timestamp = () => Math.floor(new Date().getTime() / 1000)

export = {
  access,
  apns,
  aws,
  require: reqRequire,
  uuid,
  wrap,
  timestamp,
}
