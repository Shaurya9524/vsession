import "dotenv/config"

function required(name: string, fallback?: string): string {
  const value = process.env[name] ?? fallback
  if (value === undefined) {
    throw new Error(`Missing required env var: ${name}`)
  }
  return value
}

export const env = {
  port: Number(required("PORT", "4000")),
  webOrigin: required("WEB_ORIGIN", "http://localhost:3000"),
  redisUrl: required("REDIS_URL", "redis://localhost:6379"),
}
