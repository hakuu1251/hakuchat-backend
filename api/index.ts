import { Router } from 'express'
import domainRouter from './domain'
import userRouter from './user'

export default Router()
.use('/user', userRouter)
.use('/domain', domainRouter)