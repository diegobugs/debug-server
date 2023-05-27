import { Response, NextFunction, Request } from "express"
import {
  UnauthorizedError,
  UnauthenticatedError,
  InternalServerError,
  BadRequestError,
  ConflictError,
  ValidationError,
  RateLimitExceededError,
  InternalAuthError,
  NotFoundError,
  CorsError,
} from "@models"

/**
 * Not found error handling middleware.
 * @param req Express request instance.
 * @param res Express response instance.
 */
export function handleNotFoundError(req: Request, res: Response): void {
  res.status(404).json({
    status: 404,
    message: "Route not found",
    ...(req.method ? { request: req.method } : {}),
    ...(req.path ? { path: req.path } : {}),
  })
}

/**
 * Error handling middleware.
 * @param error Thrown error.
 * @param req Express request instance.
 * @param res Express response instance.
 * @param next Express next function.
 */
export function handleErrors(
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (process.env.NODE_ENV === "development") {
    console.log(error)
  }

  if (
    error instanceof UnauthorizedError ||
    error instanceof UnauthenticatedError ||
    error instanceof BadRequestError ||
    error instanceof RateLimitExceededError
  ) {
    res.status(error.status).json({
      status: error.status,
      name: error.name,
      ...(error.message ? { message: error.message } : {}),
    })
  } else if (error instanceof InternalServerError) {
    res.status(error.status).json({
      status: error.status,
      name: error.name,
      ...(error.message ? { message: error.message } : {}),
      ...(error.error && process.env.NODE_ENV === "development"
        ? { error: error.error }
        : {}),
    })
  } else if (error instanceof ConflictError) {
    res.status(error.status).json({
      status: error.status,
      name: error.name,
      ...(error.message ? { message: error.message } : {}),
      conflicts: error.conflicts,
    })
  } else if (error instanceof ValidationError) {
    res.status(error.status).json({
      status: error.status,
      name: error.name,
      ...(error.message ? { message: error.message } : {}),
      errors: error.errors
        ? error.errors.map((error) => {
            return {
              property: error.property,
              message: error.message,
              value: error.value,
            }
          })
        : {},
    })
  } else if (error instanceof InternalAuthError) {
    res.status(error.status).json({
      status: error.status,
      name: error.name,
      ...(error.message ? { message: error.message } : {}),
      ...(error.data ? { data: error.data } : {}),
    })
  } else if (error instanceof NotFoundError) {
    res.status(error.status).json({
      status: error.status,
      name: error.name,
      ...(error.message ? { message: error.message } : {}),
    })
  } else if (error instanceof CorsError) {
    res.status(error.status).json({
      status: error.status,
      name: error.name,
      ...(error.message ? { message: error.message } : {}),
    })
  } else {
    res.status(error.status || 500).json({
      status: error.status || 500,
      message: "Unhandled error",
      ...(process.env.NODE_ENV === "development" ? { error } : {}),
    })
  }
  next()
}
