import { NextFunction, Request, Response } from "express"

/**
 * Parses response into correct format.
 * @param req Express request instance.
 * @param res Express response instance.
 * @param next Express next function instance.
 */
export function handleResponse(
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.locals.return = (status: number, data: any, meta?: object) => {
    const returnData = meta ? { data, meta } : { data }
    res.status(status).json(returnData)
  }
  next()
}
