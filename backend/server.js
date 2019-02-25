require('dotenv').config()
const mongoose = require('mongoose')
const express = require('express')
const bodyParser = require('body-parser')
const logger = require('morgan')
const request = require('request')

const API_PORT = 3001
const app = express()
const router = express.Router()

// this is our MongoDB database
const dbRoute = process.env.MONGO_DB_LINK

// connects our back end code with the database
mongoose.connect(dbRoute, { useNewUrlParser: true })

let db = mongoose.connection

db.once('open', () => console.log('connected to the database'))

// checks if connection with the database is successful
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(logger('dev'))

app.use(function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*')
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
	next()
})

// append /api for our http requests
app.use('/api', router)

router.get('/current_weather/:lat,:long', (req, res, next) => {
	request(
		`https://api.darksky.net/forecast/${process.env.DARKSKY_API}/${req.params.lat},${
			req.params.long
		}`,
		function(error, response, body) {
			const data = JSON.parse(body)
			const summary = data.currently.summary
			const icon = data.currently.icon
			const temp = data.currently.temperature
			res.send({ icon, summary, temp })
			res.end()
		},
	)
})

router.get('/current_news', (req, res, next) => {
	request(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.CNN_API}`, function(
		error,
		response,
		body,
	) {
		const data = JSON.parse(body)
		res.send(data)
		res.end()
	})
})

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`))
