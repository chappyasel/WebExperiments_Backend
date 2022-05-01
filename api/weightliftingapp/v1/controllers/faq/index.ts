import express = require('express')
const faq = express.Router()
import util = require('../../../../util')
import data from './data'

/**
 * @api {get} /faq
 * @apiGroup FAQ
 * @apiDescription Get a list of frequently asked questions
 *
 * @apiSuccess { items: FAQ[] }        The list of FAQs
 **/
faq.get(
  '/',
  util.wrap((req: any, res: any) => {
    res.json({
      items: data.items ?? []
    })
  })
)

export = faq