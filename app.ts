import express = require('express')
import http = require('http')
import bodyParser = require('body-parser')
const app = express()
const server = new http.Server(app)
const helmet = require('helmet')

const PORT = 8081

// MARK - SETUP
app.use(helmet())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

server.listen(PORT, () => {
  console.log('Web Experiments activated!')
})

// MARK - Public paths
if (__dirname.includes('/.build')) {
  app.use('/', express.static(__dirname + '/../public'))
} else {
  app.use('/', express.static(__dirname + '/public'))
}

// MARK - Weightlifting app routes
app.use(
  '/api/weightliftingapp/v1',
  require('./api/weightliftingapp/v1/controllers')
)

// MARK - Fantasy routes
app.use('/api/fantasy/v1/', require('./api/fantasy/v1/'))

// MARK - Error handler
app.use((err: any, _: any, res: any, __: any) => {
  return res.status(err.output.statusCode).json(err.output.payload)
})
