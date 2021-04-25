import middlewares from '../middlewares'

const { auth } = middlewares

const signIn = (req, res) => {
	// TODO
	res.render('signin.pug')
}

const signUp = (req, res) => {
	// TODO
	res.render('signup.pug')
}

const profile = (req, res) => {
	res.render('profile.pug')
}

const users = (req, res) => {
	// TODO
	res.render('users.pug')
}

const task = (req, res) => {
	res.render('task.pug')
}

const editTask = (req, res) => {
	res.render('edittask.pug')
}

export default {
	signIn,
	signUp,
	profile,
	users,
	task,
	editTask
}
