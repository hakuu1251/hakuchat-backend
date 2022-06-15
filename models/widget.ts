import { Schema, model } from 'mongoose'
import { IWidget } from '../types/widget'

const widgetSchema = new Schema<IWidget>({
	domain: { 
		type: Schema.Types.ObjectId, 
		ref: 'Domain', 
		required: true 
	},
	auto_messages: [{type: String, required: true}],
	manager_name: {
		type: String,
		required: true
	},
	text_in_header: {
		type: String,
		required: true
	},
	email_for_contact: {
		type: Boolean,
		default: false,
		required: true
	},
	avatar: {
		type: String
	},
	size: {
		type: String,
		enum: ['small', 'medium', 'large'],
		default: 'medium',
		required: true
	},
	theme: {
		type: Schema.Types.ObjectId, 
		ref: 'Theme', 
		required: true 
	}
})

const Widget = model<IWidget>('User', widgetSchema)

export default Widget