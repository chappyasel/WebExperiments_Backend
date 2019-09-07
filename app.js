const express = require('express')
const app = express()
const server = require('http').Server(app)
const bodyParser = require('body-parser')
const helmet = require('helmet')

const path = './weightliftingapp/v1/'
const users = require(path + 'users')

app.use(helmet())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

server.listen(8081, (err) => {
	if (err) throw err
	console.log('Web Experiments activated!')
})

app.use('/', express.static(__dirname + '/public'))

const version = 'v1'
const basePath = '/weightliftingapp/' + version

app.use(basePath + '/users', users)

// error handling
app.use((err, req, res, next) => {
	console.error(err)
	res.status(err.output.statusCode)
	   .json({ error: err.output.payload })
})