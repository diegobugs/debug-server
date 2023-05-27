import express, { Application } from "express"
import { handleCors, handleResponse, registerBodyParsers } from "@middleware"
import { initRoutes } from "@routes"

const app: Application = express()

handleCors(app)
app.use(express.json())

registerBodyParsers(app)

app.use(handleResponse)
initRoutes(app)

export default app
