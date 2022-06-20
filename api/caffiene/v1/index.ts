import express = require('express')
const caffiene = express.Router()
import util = require('#util')
const JWTDecode = require('jwt-decode')

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
    const { email } = JWTDecode(req.headers.authorization)
    // TODO: Database based on TypeDORM / DynamoDB
    // https://medium.com/nextfaze/supercharge-%EF%B8%8F-your-dynamodb-single-table-design-pattern-with-typedorm-39168d0d2e29
    res.json({ test: email })
  })
)

export = caffiene
