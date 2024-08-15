import express from 'express'
const feedbackComments = express.Router()
import util from '../../../../../util'
import * as db from './db'
import * as t from './types'

feedbackComments.get(
  '/',
  util.wrap(async (req: any, res: any) => {
    res.json({
      items: req.feedback_id,
    })
  })
)

feedbackComments.post(
  '/new',
  util.wrap(async (req: any, res: any) => {
    res.json({
      items: req.feedback_id,
    })
  })
)

export default feedbackComments
