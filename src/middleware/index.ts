import { handleResponse } from "./response.middleware"
import { registerBodyParsers } from "./parser.middleware"
import { handleCors } from "./cors.middleware"

export { handleCors, handleResponse, registerBodyParsers }
