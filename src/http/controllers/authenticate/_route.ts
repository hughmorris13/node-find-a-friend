import { FastifyInstance } from 'fastify'
import { authenticate } from './authenticate'
import { refresh } from './refresh'
import { profile } from './profile'
import { verifyJwt } from '@/http/middlewares/verify-jwt'

export async function authRoutes(app: FastifyInstance) {
  app.post('/session', authenticate)
  app.patch('/session/refresh', refresh)
  app.get('/me', { onRequest: [verifyJwt] }, profile)
}
