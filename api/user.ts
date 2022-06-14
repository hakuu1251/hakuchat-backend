import { Router, Request, Response } from 'express'
import User from '../models/user'


const userRouter = Router()

userRouter.get('/all', (req: Request, res: Response) => {
	User.find().lean().exec((err, users) => {
		if (err) {
			return res.status(400).json({
				success: false,
				message: err.message && err
			})
		}
		
		return res.status(200).json({
			success: true,
			users: users
		})
	})
})

userRouter.post('/create', async (req: Request, res: Response) => {
	
	// if user with current email is deleted
	// remove his from db and create new user XDXDDDDDD
	// TODO: Add CASCADE remove operation
	const oldUser = await User.findOne({email: req.body.email})
	if (oldUser && oldUser.isRemoved === true) {
		oldUser.remove()
	}

	const userDetails = new User({
		username: req.body.username,
		email: req.body.email,
		type: req.body.type
	})

	userDetails.save((err: any, doc) => {

		if (err) 
		{
			return res.status(400).json({
				success: false,
				message: err && err.message,
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
	console.log(req.params.id)
	User.findById(req.params.id, (err: any, user: any) => {

		if (err) {
			res.status(404).json({
				success: false,
				message: "Filed to find user"
			})
		}

		user.updateOne({isRemoved: true}, (err: any, doc: any) => {
			if (err) {
				return res.status(400).json({
					success: false,
					message: err.message && err
				})
			} 

			return res.status(200).json({
				success: true,
				message: "User removed successfully"
			})
			
		})

	})
})

userRouter.put('/reset/:id', (req: Request, res: Response) => {

	User.findById(req.params.id, (err: any, user: any) => {

		if (err) {
			return res.status(404).json({
				success: false,
				message: "Filed to find user"
			})
		}

		user.updateOne({isRemoved: false}, (err: any, doc: any) => {
			if (err) {
				return res.status(400).json({
					success: false,
					message: err.message && err
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
