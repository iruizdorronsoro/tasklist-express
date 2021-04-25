import mongoose from 'mongoose'
import config from "./config";
import models from './models'

const createRoles = async () => {
	try {
		const count = await models.role.estimatedDocumentCount()
		if (count > 0) {
			return
		}

		const res = await Promise.all([
			new models.role({ name: 'user'}).save(),
			new models.role({ name: 'admin'}).save(),
		])

		console.log('xxx roles: ', res)
	} catch (err) {
		console.error(err)
	}
}

const options = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true
}

mongoose.connect(config.db.mongo.host, options)
	.then(async (db) => {
		await createRoles()
	})
	.catch((error) => console.log(error))
