import express from 'express'
import http from "http";
import routes from './routes'
import pug from 'pug'
import path from "path"
import morgan from 'morgan'
import config from './config'
import cors from 'cors'

const app = express()
const server = http.createServer(app)

import session from 'express-session'
import ConnectMongoDBSession from 'connect-mongodb-session'
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
app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(session({
	secret: config.session.secret,
	resave: true,
	saveUninitialized: true,
	store,
	cookie: {
		maxAge: 1000 * 60 * 60
	}
}))

// Pages
app.use('/', routes.pages)
app.use('/', routes.session.router) // backend

// API
app.use('/', routes.api.auth)
app.use('/', routes.api.user)
app.use('/', routes.api.admin)

//Public

export default {
	server,
	port: app.get('port')
}
