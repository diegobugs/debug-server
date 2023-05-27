import { Application } from "express"
import useHealthRoutes from "./health.routes"

const initRoutes = (app: Application) => {
  useHealthRoutes(app)
}

export default initRoutes
