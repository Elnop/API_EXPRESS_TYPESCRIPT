import express, { Express } from 'express'
import dotenv from 'dotenv'
import setupRoutes from './routs'

dotenv.config()

const app: Express = express()
const port = process.env.PORT

app.use(express.json())

setupRoutes(app).then(() => {
  app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`)
  })
})
