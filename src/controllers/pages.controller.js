import middlewares from '../middlewares'
import user from './api/user.controller'

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
	const user = req.session.user
	console.log(user)
	res.render('profile.pug', {user})
}

const users = (req, res) => {
	// TODO
	res.render('users.pug')
}

const tasks = async (req, res) => {
	const tasklist = await user.getTasks(req)
  console.log("XXX - " + tasklist)
	res.render('tasks.pug', {tasklist})
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
	tasks,
	task,
	editTask
}
