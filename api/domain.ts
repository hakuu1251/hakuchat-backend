import { Router, Request, Response } from 'express'
import { HydratedDocument } from 'mongoose'
import { IDomain } from '../types/domain'
import Domain from '../models/domain'
import User from '../models/user'

const domainRouter = Router()


domainRouter.post('/add', (req: Request, res: Response) => {
	const isUser = User.findById(req.body.user).exec()

	isUser
		.then(() => {
			const domainDetails: HydratedDocument<IDomain> = new Domain({
				url: req.body.url,
				user: req.body.user,
			})

			domainDetails.save((err, doc) => {
				if (!err) 
				{
					res.status(200).json({
						success: true,
						url: doc.url,
						id: doc._id,
					})
				} 
				else 
				{
					res.status(400).json({
						success: false,
						message: err && err.message,
					})
				}
			})
		})
		.catch((err: Error) => {
			res.status(404).send({
				success: false,
				message: "User not found",
			})
		})
})

domainRouter.delete('/rm/:id', (req: Request, res: Response) => {

	Domain.findById(req.params.id, (err: Error, domain: HydratedDocument<IDomain>) => {
		if (domain === null) {
			return res.status(404).json({
				success: false,
				message: "Domain not found"
			})
		}

		if (err) {
			return res.status(400).json({
				success: false,
				message: err && err.message
			})
		}

		domain.remove((err: Error, doc: HydratedDocument<IDomain>) => {
			if (err) {
				return res.status(400).json({
					success: false,
					message: err && err.message
				})
			}

			return res.status(200).json({
				success: true,
				message: 'Successfully deleted domain',
			})
		})
	})
})

domainRouter.get('/by-user/:id', (req: Request, res: Response) => {

	Domain.find({user: req.params.id}, (err: Error, docs: Array<HydratedDocument<IDomain>>) => {
		if (docs.length === 0) {
			return res.status(404).json({
				success: false,
				message: "Domains not found"
			})
		} 

		if (err) {
			return res.status(400).json({
				success: false,
				message: err.message
			})
		}

		return res.status(200).json({
			success: true,
			domains: docs
		})
	})
})

export default domainRouter
