import boom = require('boom')

/**
 * @description Enforces the given param is in the request, returns its value
 * @param {any} req              The request to enforce
 * @param {string} param         The param field to get
 *
 * @return {any}                 The required param field value
 * @throws {boom.badRequest}     If the param field is undefined
 **/
function requireParam(req: any, param: string): any {
  if (req.params[param] !== undefined) return req.params[param]
  throw boom.badRequest(`missing required param field: '${param}'`)
}

/**
 * @description Enforces the given body field is in the request, returns its value
 * @param {any} req              The request to enforce
 * @param {string} body          The body field to get
 *
 * @return {any}                 The required body field value
 * @throws {boom.badRequest}     If the body field is undefined
 **/
function requireBody(req: any, body: string): any {
  if (req.body[body] !== undefined) return req.body[body]
  throw boom.badRequest(`missing required body field: '${body}'`)
}

/**
 * @description Enforces the given header is in the request, returns its value
 * @param {any} req              The request to enforce
 * @param {string} header        The header field to get
 *
 * @return {any}                 The required header field value
 * @throws {boom.badRequest}     If the header field is undefined
 **/
function requireHeader(req: any, header: string): any {
  if (req.header(header) !== undefined) return req.header(header)
  throw boom.badRequest(`missing required header field: '${header}'`)
}

export = {
  param: requireParam,
  body: requireBody,
  header: requireHeader,
}
