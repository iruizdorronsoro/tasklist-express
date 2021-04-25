import models from '../models'
import utils from '../utils'

const verifyUser = async (req, res, next) => {
	try {
		const { username, email, password } = req.body
		if (!username || !email || !password) {
			throw new Error('empty data')
		}

		const user = await models.user.findOne({ email })
		if (user) {
			throw new Error('user already exist')
		}

		next()
	} catch (err) {
		res.status(400).json({ err: err.message })
	}
}

const isAdmin = async (req, res, next) => {
	try {
		const token = req.headers['x-access-token']
		await utils.verify.token(token, 'admin')

		next()
	} catch (err) {
		//Unauthorized: not forbidden
		res.status(401).json({ err: err.message })
	}
}

const isUser = async (req, res, next) => {
	try {
		const token = req.headers['x-access-token']
		const decode = await utils.verify.token(token, 'user')
		const user = await utils.verify.user(decode.id)
		if (!user) {
			throw new Error('forbidden')
		}


		next()
	} catch (err) {
		res.status(401).json({ err: err.message })
	}
}

export default {
	verifyUser,
	isAdmin,
	isUser
}
