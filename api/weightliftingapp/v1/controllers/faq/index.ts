import express from 'express'
const faq = express.Router()
import util from '../../../../util'
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
      items: data.items ?? [],
    })
  })
)

export default faq
