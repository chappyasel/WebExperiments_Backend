import boom = require('boom')

function requireParam(req: any, res: any, param: string): any {
  return (
    req.param[param] ||
    res.json(boom.badRequest(`missing required param field: '${param}'`))
  )
}

function requireBody(req: any, res: any, param: string): any {
  return (
    req.body[param] ||
    res.json(boom.badRequest(`missing required body field: '${param}'`))
  )
}

export = {
  requireParam,
  requireBody,
}
