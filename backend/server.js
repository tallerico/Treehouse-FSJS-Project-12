// require('dotenv').config()
require('dotenv').config({ silent: process.env.NODE_ENV === 'production' })
const mongoose = require('mongoose')
const express = require('express')
const bodyParser = require('body-parser')
const logger = require('morgan')
const request = require('request')
const { OAuth2Client } = require('google-auth-library')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const helmet = require('helmet')
const cors = require('cors')
const User = require('./models/User')
const News = require('./models/News')
const path = require('path')

const API_PORT = 3001
const app = express()
const router = express.Router()
const client = new OAuth2Client(process.env.GOOGLE_LOGIN_CLIENT_ID)

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
app.use(helmet())
app.use(
	session({
		secret: 'you are the coolest',
		resave: false,
		saveUninitialized: false,
		store: new MongoStore({
			mongooseConnection: db,
		}),
		cookie: { httpOnly: false, domain: 'http://localhost:3000/' },
	}),
)

app.use(function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*')
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
	next()
})

// append /api for our http requests
app.use('/api', router)
app.use(cors())

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, 'client/build')))

// Anything that doesn't match the above, send back index.html
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname + '/client/build/index.html'))
})

const corsOptions = {
	origin: 'http://localhost:3000',
	optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
}

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

router.post('/token', cors(corsOptions), (req, res, next) => {
	async function verify() {
		const ticket = await client.verifyIdToken({
			idToken: req.body.token,
			audience: process.env.GOOGLE_LOGIN_CLIENT_ID,
		})
		const payload = ticket.getPayload()
		const userid = payload['sub']
		const userInfo = payload
		const sessionID = req.sessionID

		// If request specified a G Suite domain:
		//const domain = payload['hd'];
		User.find({ user_id: userInfo['sub'] }, function(err, docs) {
			if (!docs.length) {
				const user = new User({
					given_name: userInfo['given_name'],
					family_name: userInfo['family_name'],
					full_name: userInfo['name'],
					user_id: userInfo['sub'],
					email: userInfo['email'],
					picture_url: userInfo['picture'],
				})
				User.create(user, function(error, user) {
					const docs = []
					docs.push(user)

					if (error) {
						return next(error)
					} else {
						req.session.userId = docs._id
						res.set('Location', '/home')
						res.send({ docs, sessionID })
						res.status(204)
						res.end()
					}
				})
			} else {
				req.session.userId = docs[0]._id
				res.set('Location', '/home')
				res.send({ docs, sessionID })
				res.status(204)
				res.end()
			}
		})
		// console.log(userInfo)
	}
	verify().catch(console.error)
})

router.get('/logout', (req, res, next) => {
	req.session.destroy(err => {
		if (err) {
			next(err)
		}
		res.status(204).end()
	})
})

router.post('/saved_story', cors(corsOptions), (req, res, next) => {
	const news = new News({
		user: req.body.userID,
		urlToImage: req.body.urlToImage,
		url: req.body.url,
		title: req.body.title,
	})
	News.create(news, function(error, docs) {
		if (error) {
			return next(error)
		}
	})
	res.status(204).end()
})

router.get('/saved_news/:user', cors(corsOptions), (req, res, next) => {
	News.find({ user: req.params.user }, function(error, docs) {
		if (error) {
			return next(error)
		}
		res.send(docs)
	})
})

// launch our backend into a port
// app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`))
app.listen(process.env.PORT || 3001)
