const express = require('express')
const http = require('http')
const path = require('path')
const app = express()
const server = new http.Server(app)
const helmet = require('helmet')
const boom = require('boom')

// Setup
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
server.listen(process.env.PORT, () => {
  console.log('Web Experiments activated!')
})

// Static files
app.use(express.static('client/build'))

// Weightlifting app routes
app.use('/api/weightliftingapp/v1', require('./api/weightliftingapp/v1/controllers'))

// Fantasy routes
app.use('/api/fantasy/v1/', require('./api/fantasy/v1/'))

// Liar's Dice routes
app.use('/api/liarsdice/v1/', require('./api/liarsdice/v1/'))

// Public routes
app.get('*', (_, res) => res.sendFile(path.resolve('client', 'build', 'index.html')))

// Error handler
app.use((err: any, _: any, res: any, __: any) => {
  if (!boom.isBoom(err)) err = boom.badImplementation(err)
  return res.status(err.output.statusCode).json(err.output.payload)
})
