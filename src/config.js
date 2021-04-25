const config = {
	jwt: {
		secret: 'secret_key',
		signup: {
			time: '1d'
		}
	},
	db: {
		mongo: {
			host: 'mongodb+srv://admin:temporaryadminpass@jscluster.r9ocu.mongodb.net/0423-todolist'
		}
	},
	session: {
		secret: 'session_key',
		db: {
			uri: 'mongodb+srv://admin:temporaryadminpass@jscluster.r9ocu.mongodb.net/0423-todolist',
			collection: 'sessions'
		}
	}
}

export default config
