import fastify from 'fastify'
import fastifyJwt from '@fastify/jwt'
import fastifyCookie from '@fastify/cookie'
import { authRoutes, ongRoutes, petsRoutes } from './http/router'

export const app = fastify()

// Register fastify cookie
app.register(fastifyCookie)

// Register fastify jwt
app.register(fastifyJwt, {
  secret: 'super-secret-key',
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
