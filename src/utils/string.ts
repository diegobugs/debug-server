export const generateRandomString = (length: number) => {
  const chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
  let result = ""
  for (let i = length; i > 0; --i)
    result += chars[Math.floor(Math.random() * chars.length)]
  return result
}

export const mapQueryString = (string: any): string[] | undefined => {
  if (!string) return
  const typeString = typeof string === "string"

  if (typeString) {
    const array = string.split(",")
    return array
  }

  return string
}
