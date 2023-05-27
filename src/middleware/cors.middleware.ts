import { CorsError } from "@models"
import cors from "cors"
import { Application } from "express"

const whitelist = process.env.CORS_WHITELIST?.split(",")

/**
 * CORS middleware.
 * @param app Express application instance.
 */
export const handleCors = (app: Application) => {
  app.use(
    cors({
      origin: (origin, callback) => {
        if (
          (origin && whitelist?.includes(origin)) ||
          (process.env.NODE_ENV === "development" && !origin)
        ) {
          return callback(null, origin)
        }
        return callback(new CorsError("Not allowed by CORS"))
      },
    })
  )
}
