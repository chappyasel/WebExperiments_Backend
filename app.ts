const express = require('express')
const app = express()
const server = require('http').Server(app)
const bodyParser = require('body-parser')
const helmet = require('helmet')

// MARK - SETUP
app.use(helmet())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

server.listen(8081, (err: any) => {
  if (err) throw err
  console.log('Web Experiments activated!')
})

app.use((err: any, req: any, res: any, next: any) => {
  console.error(err)
  res.status(500).render('error', { error: err })
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
