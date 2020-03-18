import express = require('express')
const feedbackComments = express.Router()
import util = require('../../../util')
import db = require('./db')
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

export = feedbackComments
