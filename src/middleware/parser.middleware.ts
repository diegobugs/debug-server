import { Application, NextFunction, Response, Request } from "express"
import bodyParser from "body-parser"
import snakecaseKeys from "snakecase-keys"

/**
 * Registers requests body parser middleware.
 * @param app Application instance.
 */
export function registerBodyParsers(app: Application) {
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json())
  app.use(snakecase())
}

/**
 * Function to convert all request body, params and query keys to snake_case.
 */
const snakecase = () => (req: Request, res: Response, next: NextFunction) => {
  req.body = snakecaseKeys(req.body, { deep: true })
  req.params = snakecaseKeys(req.params)
  req.query = snakecaseKeys(req.query)
  return next()
}
