declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "production" | "development" | "staging"
      PORT: number
      OPENAI_API_KEY: string
    }
  }
}

export {}
