const express = require('express')
const app = express()
const server = require('http').Server(app)
const bodyParser = require('body-parser')
const helmet = require('helmet')

const waPath = './api/weightliftingapp/v1/'
const users = require(waPath + 'users')
const waBasePath = '/weightliftingapp/v1'

const fPath = './api/fantasy/v1/'
const fantasy = require(fPath)
const fBasePath = '/fantasy/v1'


// MARK - SETUP

app.use(helmet())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

server.listen(8081, (err) => {
	if (err) throw err
	console.log('Web Experiments activated!')
})

app.use((err, req, res, next) => {
	console.error(err)
	res.status(500).render('error', { error: err })
})


// MARK - ROUTES

app.use('/', express.static(__dirname + '/public'))

app.use(waBasePath + '/users', users)

app.use(fBasePath + '/', fantasy)