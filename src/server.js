import express from 'express'
import http from "http";
import routes from './routes'
import pug from 'pug'
import path from "path";
import morgan from 'morgan'
import config from './config'

import session from 'express-session'
import ConnectMongoDBSession from 'connect-mongodb-session'

const app = express()
const server = http.createServer(app)

const MongoDBStore = ConnectMongoDBSession(session)
const store = new MongoDBStore({
	uri: config.session.db.uri,
	collection: config.session.db.collection
})
store.on('error', (error) => console.log(error))

// Settings.
app.set('port', process.env.PORT || 4141)
app.set('view engine', pug)
app.set('views', path.join(__dirname, 'views'))

//Middlewares
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(session({
	name: 'cookie-name',
	secret: config.session.secret,
	//Update db data every
	resave: false,
	//Save session data before initialize it
	saveUninitialized: false,
	store,
	cookie: {
		maxAge: 1000 * 60 * 60
	}
}))

// Pages
app.use('/pages', routes.pages)

// API
app.use('/api/auth', routes.api.auth)
app.use('/api/user', routes.api.user)
app.use('/api/admin', routes.api.admin)

//Public

export default {
	server,
	port: app.get('port')
}
