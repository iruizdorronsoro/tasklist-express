import user from './api/user.controller'
import admin from './api/admin.controller'

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
	res.render('profile.pug', {user})
}

const users = async (req, res) => {
	const users = await admin.getUsers()
	res.render('users.pug', {users})
}

const tasks = async (req, res) => {
	const tasklist = await user.getTasks(req)
	res.render('tasks.pug', {tasklist})
}

const task = (req, res) => {

	res.render('task.pug')
}

const editTask = async (req, res) => {
	const task = await user.getTask(req)
	res.render('edittask.pug', {task})
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
