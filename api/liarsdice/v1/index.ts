import express = require('express')
const liarsdice = express.Router()
import util = require('../../util')
import LiarsDice = require('./liarsDice')

/**
 * @api {get} /play
 * @apiGroup LiarsDice
 * @apiDescription Play a game of Liar's Dice
 *
 * @apiSuccess LiarsDice.Output       The game output
 */
liarsdice.get(
  '/play',
  util.wrap((req: any, res: any) => {
    const input: LiarsDice.Input = {
      myDice: util.require.body(req, 'myDice'),
      totalDice: util.require.body(req, 'totalDice'),
      countOnes: util.require.body<boolean>(req, 'countOnes'),
      minProbability: util.require.body<number>(req, 'minProbability', 0.01),
    }
    res.json(LiarsDice.play(input))
  })
)

export = liarsdice
