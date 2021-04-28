import models from "../../models";

const getTasks = async (req) => {
	try {
		let tasks
		if(req.session.user === undefined || req.session.user === null ) {
			tasks = await models.task.find({isPublic:true})
			console.log(tasks)
		}
		else {
			const email = req.session.user.email
			const user = await models.user.findOne({ email })
			tasks = await models.task.find({$or:[{_id: {$in: user.tasks}}, {isPublic:true}]})
		}
		return tasks
	} catch (err) {
		console.log(err)
	}
}

const getTask = async (req) => {
	try {
		const task = await models.task.findOne({_id: req.params.id})
		return task
	} catch (err) {
		console.log(err)
	}
}

const createTask = async (req, res) => {
	try {
		const { title, description, isPublic } = req.body
		let $isPublic = false
		console.log(isPublic)
		if (isPublic === '')
		{
			$isPublic = true
		}
		const task = await models.task({ title, description, isPublic:$isPublic }).save()

		if(!$isPublic) {
			const email = req.session.user.email
			const user = await models.user.findOneAndUpdate({email: email}, {$push: {tasks: task._id}})
		}

		res.status(201).redirect('/tasks')
	} catch (err) {
		res.status(400).json({ err: err.message })
	}
}

const editTask = async (req, res) => {
	try {
		const { title, description, isPublic } = req.body
		let $isPublic = false
		console.log(isPublic)
		if (isPublic === '')
		{
			$isPublic = true
		}
		const task = await models.task.findOne({ _id: req.params.id })
		if(!isEmpty(task)){
			await models.task.updateOne({ _id: task._id }, {$set:{title: title, description: description, isPublic: $isPublic}})
		}
		else{
			res.json({ err: "Task not found" })
		}

		res.status(201).redirect('/tasks')
	} catch (err) {
		res.status(400).json({ err: err.message })
	}
}

const deleteTask = async (req, res) => {
	try {
		const task = await models.task.findOne({ _id: req.params.id })

		if(!task.isPublic) {
			const email = req.session.user.email
			const user = await models.user.findOneAndUpdate({email: email}, {$pull: {tasks: task._id}})
		}
		await models.task.deleteOne({ _id: task._id })

		res.status(201).redirect('/tasks')
	} catch (err) {
		res.status(400).json({ err: err.message })
	}
}

function isEmpty(obj) {
	return Object.keys(obj).length === 0;
}

export default {
	createTask,
	getTasks,
	getTask,
	editTask,
	deleteTask
}
