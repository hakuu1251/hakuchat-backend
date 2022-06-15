import { Router, Request, Response } from 'express'
import { HydratedDocument } from 'mongoose'
import { IUser } from '../types/user'
import User from '../models/user'

const userRouter = Router()

userRouter.get('/all', (req: Request, res: Response) => {
	User.find().lean().exec((err: any, users: any) => {
		if (err) {
			return res.status(400).json({
				success: false,
				message: err.message
			})
		}
		
		return res.status(200).json({
			success: true,
			users: users
		})
	})
})

userRouter.get('/id/:id', (req: Request, res: Response) => {
	User.findById(req.params.id, (err: Error, user: HydratedDocument<IUser>) => {
		if (err) {
			return res.status(400).json({
				success: false,
				message: err.message
			})
		}

		if (!user) {
			return res.status(404).json({
				success: false,
				message: 'User not found'
			})
		}

		return res.status(200).json({
			success: true,
			user: user
		})
	})
})

userRouter.post('/create', async (req: Request, res: Response) => {
	
	// if user with current email is deleted
	// remove his from db and create new user XDXDDDDDD
	const oldUser: any = await User.findOne({email: req.body.email})
	if (oldUser && oldUser.isRemoved === true) {
		await oldUser.remove()
	}

	const userDetails: HydratedDocument<IUser> = new User({
		username: req.body.username,
		email: req.body.email,
		type: req.body.type
	})

	userDetails.save((err, doc) => {

		if (err) 
		{
			return res.status(400).json({
				success: false,
				message: err.message,
			})
		}

		return res.status(200).json({
			success: true,
			id: doc._id,
			email: doc.email,
			type: doc.type,
		})
		
	})
})

userRouter.put('/rm/:id', (req: Request, res: Response) => {
	User.findById(req.params.id, (err: Error, user: HydratedDocument<IUser>) => {
		if (!user) {
			return res.status(404).json({
				success: false,
				message: "User not found"
			})
		}

		if (err) {
			return res.status(400).json({
				success: false,
				message: err.message
			})
		}

		if (user.isRemoved) {
			return res.status(200).json({
				success: true,
				message: "This user is already deleted"
			})
		}

		user.updateOne({isRemoved: true}, (err: Error, doc: HydratedDocument<IUser>) => {
			if (err) {
				return res.status(400).json({
					success: false,
					message: err.message
				})
			} 

			return res.status(200).json({
				success: true,
				message: "User removed successfully"
			})
			
		})

	})
})

userRouter.put('/restore/:id', (req: Request, res: Response) => {

	User.findById(req.params.id, (err: Error, user: HydratedDocument<IUser>) => {

		if (!user) {
			return res.status(404).json({
				success: false,
				message: "User not found"
			})
		}

		if (err) {
			return res.status(400).json({
				success: false,
				message: err.message
			})
		}

		if (!user.isRemoved) {
			return res.status(200).json({
				success: true,
				message: "This user is already restored"
			})
		}

		user.updateOne({isRemoved: false}, (err: Error, doc: HydratedDocument<IUser>) => {
			if (err) {
				return res.status(400).json({
					success: false,
					message: err.message
				})
			}

			return res.status(200).json({
				success: true,
				message: "The user is successfully restored"
			})
		})

	})
})

export default userRouter
