import express = require('express')
const caffiene = express.Router()
import util = require('#util')

/**
 * @api {post} /play
 * @apiGroup LiarsDice
 * @apiDescription Play a game of Liar's Dice
 *
 * @apiSuccess LiarsDice.Output       The game output
 */
caffiene.get(
  '/',
  util.wrap((req: any, res: any) => {
    res.json({ test: 'hello' })
  })
)

export = caffiene
