import express = require('express')
import http = require('http')
import bodyParser = require('body-parser')
const path = require('path')
const app = express()
const server = new http.Server(app)
const helmet = require('helmet')
import boom = require('boom')

// Setup
app.use(helmet())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
server.listen(process.env.PORT, () => {
  console.log('Web Experiments activated!')
})

// Static files
app.use(express.static('client/build'))

// Weightlifting app routes
app.use(
  '/api/weightliftingapp/v1',
  require('./api/weightliftingapp/v1/controllers')
)

// Fantasy routes
app.use('/api/fantasy/v1/', require('./api/fantasy/v1/'))

// Public routes
app.get('*', (_, res) =>
  res.sendFile(path.resolve('client', 'build', 'index.html'))
)

// Error handler
app.use((err: any, _: any, res: any, __: any) => {
  if (!boom.isBoom(err)) err = boom.badImplementation(err)
  return res.status(err.output.statusCode).json(err.output.payload)
})
