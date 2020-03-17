const feedbackComments = require('express').Router()

feedbackComments.get('/', async (req: any, res: any) => {
  res.json({
    items: 'TEST 2',
  })
})

export = feedbackComments
