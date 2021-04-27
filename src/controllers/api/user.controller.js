import models from "../../models";

const createTask = async (req, res) => {
	try {
		const { title, description, isPublic } = req.body
		let $isPublic = false
		if (isPublic === 'on')
		{
			$isPublic = true
		}
		const task = await models.task({ title, description, isPublic:$isPublic }).save()

		const email = req.session.user.email
		const user = await models.user.findOneAndUpdate({email: email}, {$push: { tasks: task._id}})


		res.status(201).redirect('/tasks')
	} catch (err) {
		res.status(400).json({ err: err.message })
	}
}

const getTasks = async (req) => {
	try {
		const email = req.session.user.email
		const user = await models.user.findOne({ email })
		const tasks = await models.task.find({$or:[{_id: {$in: user.tasks}}, {isPublic:true}]})
		return tasks
	} catch (err) {
		console.log(err)
	}
}

export default {
	createTask,
	getTasks
}
