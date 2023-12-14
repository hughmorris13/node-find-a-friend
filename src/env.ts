import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z.string().default('dev'),
  SERVER_PORT: z.coerce.number().default(3333),
  SERVER_HOST: z.string().default('0.0.0.0'),
  DATABASE_URL: z.string(),
})

const _env = envSchema.safeParse(process.env)

if (!_env.success) {
  console.error('😵 Invalid environment variables!')
  throw new Error('Invalid environment variables!')
}

export const env = _env.data
