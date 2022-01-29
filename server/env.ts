const hostname = process.env.HOSTNAME || "localhost"
const port = process.env.PORT || 3000

export const env = {
  hostname,
  port
}