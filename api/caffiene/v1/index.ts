import express = require('express')
const caffiene = express.Router()
import util = require('#util')
const JWTDecode = require('jwt-decode')
import { DB } from './db'

/**
 * @api {get} /
 * @apiGroup Caffiene
 * @apiDescription Get caffiene doses for user
 */
caffiene.get(
  '/',
  util.wrap(async (req: any, res: any) => {
    const { email } = JWTDecode(req.headers.authorization)
    const result = await DB.get(email)
    res.json({ doses: result })
  })
)

/**
 * @api {post} /create
 * @apiGroup Caffiene
 * @apiDescription Create a new caffiene dose
 */
caffiene.post(
  '/create',
  util.wrap(async (req: any, res: any) => {
    const { email } = JWTDecode(req.headers.authorization)
    console.log(req.body)
    const result = await DB.create({
      email, // force email to verified JWT token email
      timestamp: util.require.body(req, 'timestamp'),
      consumedInterval: util.require.body(req, 'consumedInterval'),
      name: util.require.body(req, 'name'),
      type: util.require.body(req, 'type'),
    })
    res.json({ dose: result })
  })
)

export = caffiene
