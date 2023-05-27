import dotenv from "dotenv"
dotenv.config({
  path: `.env.${process.env.NODE_ENV}`,
})
import "module-alias/register"

import App from "./App"
import { InternalServerError } from "@models"

const PORT = process.env.PORT || 3000

;(async () => {
  try {
    /**
     * Start Express server
     */
    App.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`)
    }).on("error", (error) => {
      throw new InternalServerError(error.message, error)
    })
  } catch (error) {
    console.error(error)
  }
})()
