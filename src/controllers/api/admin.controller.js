import models from "../../models";

const getUsers = async () => {
	try {
		const role = await models.role.findOne({name: "user"})
		return await models.user.find({ roles: role._id })
	} catch (err) {
		console.log(err)
	}
}

const deleteUser = async (req, res) => {
	try {
		const user = await models.user.findOne({ _id: req.params.id })
		if(!isEmpty(user)) {
			if (user.tasks.length !== 0) {
				user.tasks.map(async (x) => {
					console.log(x)
					await models.task.deleteOne({_id: x._id})
				})
			}
			await models.user.deleteOne({_id: user._id})
			res.status(201).redirect('/users')
		}
	} catch (err) {
		console.log(err)
	}
}

function isEmpty(obj) {
	return Object.keys(obj).length === 0;
}

export default {
	getUsers,
	deleteUser
}
