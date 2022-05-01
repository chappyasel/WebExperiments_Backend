import boom = require('boom')

/**
 * @description Enforces the given param is in the request, returns its value
 * @param {any} req              The request to enforce
 * @param {string} param         The param field to get
 * @param {Type?} defaultValue   An optional default value for param
 *
 * @return {Type}                The required param field value
 * @throws {boom.badRequest}     If the param field is undefined
 */
function requireParam<Type>(
  req: any,
  param: string,
  defaultValue?: Type | undefined,
  typeString?: string
): Type {
  return requireField(req, 'params', param, defaultValue, typeString)
}

/**
 * @description Enforces the given body field is in the request, returns its value
 * @param {any} req              The request to enforce
 * @param {string} body          The body field to get
 * @param {Type?} defaultValue   An optional default value for body
 *
 * @return {Type}                The required body field value
 * @throws {boom.badRequest}     If the body field is undefined
 */
function requireBody<Type>(
  req: any,
  body: string,
  defaultValue?: Type | undefined,
  typeString?: string
): Type {
  return requireField(req, 'body', body, defaultValue, typeString)
}

/**
 * @description Enforces the given header is in the request, returns its value
 * @param {any} req              The request to enforce
 * @param {string} header        The header field to get
 * @param {Type?} defaultValue   An optional default value for header
 *
 * @return {Type}                The required header field value
 * @throws {boom.badRequest}     If the header field is undefined
 */
function requireHeader<Type>(
  req: any,
  header: string,
  defaultValue?: Type | undefined,
  typeString?: string
): Type {
  return requireField(req, 'header', header, defaultValue, typeString)
}

function requireField<Type>(
  req: any,
  fieldType: string,
  field: string,
  defaultValue?: Type | undefined,
  typeString?: string
): Type {
  if (req[fieldType][field] === undefined) {
    if (defaultValue !== undefined) return defaultValue
    throw boom.badRequest(`missing required ${fieldType} field '${field}'`)
  }

  if (typeString !== undefined && typeof req[fieldType][field] !== typeString) {
    throw boom.badRequest(`${fieldType} field '${field}' is not of type '${typeString}'`)
  }

  return req[fieldType][field]
}

export = {
  param: requireParam,
  body: requireBody,
  header: requireHeader,
}
