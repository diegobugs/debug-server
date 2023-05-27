import { healthController } from "@controllers"
import { Application, Router } from "express"

const { getHealth } = healthController

/**
 * User routes at `/api/{API_VERSION/}`
 * @param app Express application instance
 */
const useRoutes = (app: Application) => {
  app.use(`/api/`, routes())
}

export const routes = () => {
  const router = Router()
  router.get("/health", getHealth)

  return router
}

export default useRoutes
