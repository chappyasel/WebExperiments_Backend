const boom = require('boom')

function requireParam(req, res, param) {
  return (
    req.body[param] ||
    res.json(boom.badRequest(`missing required param: '${param}'`))
  )
}

module.exports = {
  requireParam,
}
