import { HttpStatusCodes } from "@utils"
import { NextFunction, Request, Response } from "express"

const getHealth = async (req: Request, res: Response, next: NextFunction) => {
  res.locals.return(HttpStatusCodes.OK, { status: "OK" })
}

export default {
  getHealth,
}
