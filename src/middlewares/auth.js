import models from '../models'
import utils from '../utils'

const verifyUserRegistration = async (req, res, next) => {
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

const verifySession = async (req, res, next) => {
	const { user } = req.session
	if (!user) {
		return res.redirect('/signin')
	}
	next()
}

const isAdmin = async (req, res, next) => {
	const roles = req.session.user.roles
	if (!utils.verify.role(roles, 'admin')) {
		return res.redirect('/signin')
	}
	next()
}

const isUser = async (req, res, next) => {
	const roles = req.session.user.roles
	if (!utils.verify.role(roles, 'user')) {
		return res.redirect('/signin')
	}
	next()
}

export default {
	verifyUserRegistration,
	verifySession,
	isAdmin,
	isUser
}
