import { Schema, model } from 'mongoose'
import { ITheme } from './../types/theme'

const hexValidator = /^#([0-9A-F]{3}){1,2}$/i
const notValidHexMessage = 'Invalid hex'

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
	background: { type: String, required: true, validate: [hexValidator, notValidHexMessage] },
	accent: { type: String, required: true, validate: [hexValidator, notValidHexMessage] },
	accent_second: { type: String, required: true, validate: [hexValidator, notValidHexMessage] },
	text: { type: String, required: true, validate: [hexValidator, notValidHexMessage] },
	text_second: { type: String, required: true, validate: [hexValidator, notValidHexMessage] },
	manager_message: { type: String, required: true, validate: [hexValidator, notValidHexMessage] },
	guest_message: { type: String, required: true, validate: [hexValidator, notValidHexMessage] },
	disabled: { type: String, required: true, validate: [hexValidator, notValidHexMessage] },
	open_button: { type: String, required: true, validate: [hexValidator, notValidHexMessage] },
	close_button: { type: String, required: true, validate: [hexValidator, notValidHexMessage] },
	is_online: { type: String, required: true, validate: [hexValidator, notValidHexMessage] },
	is_offline: { type: String, required: true, validate: [hexValidator, notValidHexMessage] }
})

const Theme = model<ITheme>('Theme', themeSchema)

export default Theme