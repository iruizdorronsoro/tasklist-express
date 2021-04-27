const config = {
	session: {
		secret: 'secret_key',
		db: {
			uri: 'mongodb+srv://admin:temporaryadminpass@jscluster.r9ocu.mongodb.net/0423-todolist',
			collection: 'sessions'
		}
	},
	db: {
		mongo: {
			host: 'mongodb+srv://admin:temporaryadminpass@jscluster.r9ocu.mongodb.net/0423-todolist'
		}
	}
}

export default config
