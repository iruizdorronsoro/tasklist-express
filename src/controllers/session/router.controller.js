import models from '../../models'
import utils from '../../utils'

const signin = async (req, res) => {
	const { email, password } = req.body
	if (!email || !password) {
		return res.redirect('/signin')
	}

	const user = await models.user.findOne({ email }).populate('roles')
	if (!user) {
		return res.redirect('/signin')
	}

	const match = await models.user.compare(password, user.password)
	if (!match) {
		return res.redirect('/signin')
	}

	const data = {
		username: user.username,
		email: user.email,
		roles: user.roles.map((role)=> role.name)
	}

	req.session.user = data
	if (utils.verify.role(data.roles, 'admin')) {
		res.redirect('/users')
	} else {
		res.redirect('/tasks')
	}
}

const signup = (req, res) => {
	// TODO.
}

const signout = (req, res) => {
	req.session.destroy()
	res.redirect('/signin')
}

export default {
	signin,
	signup,
	signout
}
