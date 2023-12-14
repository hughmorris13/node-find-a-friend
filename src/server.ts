import { env } from './env'
import { app } from './app'

app
  .listen({
    host: env.SERVER_HOST,
    port: env.SERVER_PORT,
  })
  .then(() => {
    console.log(
      `😀 Server running on port ${env.SERVER_PORT} and host ${env.SERVER_HOST}!`,
    )
  })
