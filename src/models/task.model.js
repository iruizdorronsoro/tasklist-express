import { Schema, model } from 'mongoose'

const taskSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	isPublic: {
		type: Boolean,
		required: true
	},
	createdAt: {
		type: Date,
		required: true
	},
	updatedAt: {
		type: Date,
		required: true
	}
},{
	versionKey: false,
	timestamps: true
})

export default model('task', taskSchema)
