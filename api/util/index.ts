import boom from 'boom'

// MARK - public imports
import access from './access'
import apns from './apns'
import aws from './aws'
import reqRequire from './require'
import { v4 as uuid } from 'uuid'

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

export default {
  access,
  apns,
  aws,
  require: reqRequire,
  uuid,
  wrap,
  timestamp,
}
