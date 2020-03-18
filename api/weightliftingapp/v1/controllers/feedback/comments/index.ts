const feedbackComments = require('express').Router()
const { requireParam, requireBody } = require('../../../util')
import db = require('./db')
import * as t from './types'
const { v4: uuid } = require('uuid')

feedbackComments.get('/', async (req: any, res: any) => {
  res.json({
    items: req.feedback_id,
  })
})

feedbackComments.post('/new', async (req: any, res: any) => {
  res.json({
    items: req.feedback_id,
  })
})

export = feedbackComments
