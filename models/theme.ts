import { Schema, model } from 'mongoose'
import { ITheme } from './../types/theme'

const hexValidator = /^#([0-9A-F]{3}){1,2}$/i

const themeSchema = new Schema<ITheme>({
	title: { type: String, required: true },
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	font: { type: String },
	rounded: {
		type: Boolean,
		default: true,
		required: true
	},
	background: { type: String, required: true, validate: [hexValidator, 'invalid hex'] },
	accent: { type: String, required: true, validate: [hexValidator, 'invalid hex'] },
	accent_second: { type: String, required: true, validate: [hexValidator, 'invalid hex'] },
	text: { type: String, required: true, validate: [hexValidator, 'invalid hex'] },
	text_second: { type: String, required: true, validate: [hexValidator, 'invalid hex'] },
	manager_message: { type: String, required: true, validate: [hexValidator, 'invalid hex'] },
	guest_message: { type: String, required: true, validate: [hexValidator, 'invalid hex'] },
	disabled: { type: String, required: true, validate: [hexValidator, 'invalid hex'] },
	open_button: { type: String, required: true, validate: [hexValidator, 'invalid hex'] },
	close_button: { type: String, required: true, validate: [hexValidator, 'invalid hex'] },
	is_online: { type: String, required: true, validate: [hexValidator, 'invalid hex'] },
	is_offline: { type: String, required: true, validate: [hexValidator, 'invalid hex'] }
})

const Theme = model<ITheme>('Theme', themeSchema)

export default Theme