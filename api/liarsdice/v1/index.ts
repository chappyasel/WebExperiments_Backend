import express = require('express')
const liarsdice = express.Router()
import * as LiarsDice from '@shared/liarsdice/liarsdice'
import util = require('#util')

/**
 * @api {post} /play
 * @apiGroup LiarsDice
 * @apiDescription Play a game of Liar's Dice
 *
 * @apiSuccess LiarsDice.Output       The game output
 */
liarsdice.post(
  '/play',
  util.wrap((req: any, res: any) => {
    const input: LiarsDice.Input = {
      myDice: util.require.body(req, 'myDice'),
      totalDice: util.require.body(req, 'totalDice'),
      countOnes: util.require.body(req, 'countOnes'),
      minProbability: util.require.body<number>(req, 'minProbability', 0.01),
    }
    res.json(LiarsDice.play(input))
  })
)

export = liarsdice
