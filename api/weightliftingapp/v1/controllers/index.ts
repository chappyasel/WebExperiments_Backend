import express from 'express'
import feedbackRouter from './feedback'
import usersRouter from './users'
import faqRouter from './faq'

const weightliftingApp = express.Router()

// MARK - child routes
weightliftingApp.use('/feedback', feedbackRouter)
weightliftingApp.use('/users', usersRouter)
weightliftingApp.use('/faq', faqRouter)

export default weightliftingApp
