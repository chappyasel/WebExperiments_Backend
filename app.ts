export {}
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

// MARK - Weightlifting app paths
const waPath = './api/weightliftingapp/v1/'
const waBasePath = '/weightliftingapp/v1'
app.use(waBasePath + '/users', require(waPath + 'users'))
app.use(waBasePath + '/feedback', require(waPath + 'feedback'))

// MARK - Fantasy paths
const fPath = './api/fantasy/v1/'
const fBasePath = '/fantasy/v1'
app.use(fBasePath + '/', require(fPath))
