import fastify from 'fastify'
import fastifyJwt from '@fastify/jwt'
import fastifyCookie from '@fastify/cookie'
import { authRoutes, ongRoutes, petsRoutes } from './http/router'
import { env } from './env'
import { ZodError } from 'zod'

export const app = fastify()

// Register fastify cookie
app.register(fastifyCookie)

// Register fastify jwt
app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  sign: {
    expiresIn: '10m',
  },
})

// Register fastify routes
app.register(authRoutes)
app.register(ongRoutes)
app.register(petsRoutes)

// Global Errors handler
app.setErrorHandler((error, _request, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error.', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // TODO: Here we should log to an external tool like DataDog/NewRelic/Sentry
  }

  return reply.status(500).send({ message: 'Internal server error.' })
})
