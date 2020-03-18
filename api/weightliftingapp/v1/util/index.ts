import boom = require('boom')

// MARK - public imports
import access = require('./access')
import apns = require('./apns')
import aws = require('./aws')
const { v4: uuid } = require('uuid')

function requireParam(req: any, param: string): any {
  if (req.body[param] !== undefined) return req.params[param]
  throw boom.badRequest(`missing required param field: '${param}'`)
}

function requireBody(req: any, param: string): any {
  if (req.body[param] !== undefined) return req.body[param]
  throw boom.badRequest(`missing required body field: '${param}'`)
}

function requireHeader(req: any, param: string): any {
  if (req.header(param) !== undefined) return req.header(param)
  throw boom.badRequest(`missing required header field: '${param}'`)
}

const wrap = (fn: any) => async (req: any, res: any, next: any) => {
  return Promise.resolve(fn(req, res, next)).catch(err => {
    if (!err.isBoom) return next(boom.badImplementation(err))
    next(err)
  })
}

export = {
  access,
  apns,
  aws,
  uuid,
  wrap,
  requireParam,
  requireBody,
  requireHeader,
}
