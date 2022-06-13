import express, { Express, Request, Response, Router } from 'express'
import dotenv from 'dotenv'
import { connect } from 'mongoose'
import api from './api'

dotenv.config()
const app: Express = express()
const port = process.env.PORT
const mongoDB: any = process.env.DATABASE_URL

app.get('/', (req: Request, res: Response) => {
	res.send('Express + TypeScript Server')
})

app.listen(port, () => {
	console.log(`⚡️[server]: Server is running at https://localhost:${port}`)
})

connect(mongoDB, (err) => {
	if (err) console.log(`⚡️[server]: MongoDB not connected. ${err}`)
	console.log('⚡️[server]: MongoDB Connected')
})

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use('/api', api)
