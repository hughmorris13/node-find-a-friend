import { FastifyInstance } from 'fastify'
import { list } from './list'
import { show } from './show'
import { create } from './create'
import { verifyJwt } from '@/http/middlewares/verify-jwt'

export async function petsRoutes(app: FastifyInstance) {
  app.get('/pets/city/:city', list)
  app.get('/pets/:id', show)
  app.post('/pets', { onRequest: [verifyJwt] }, create)
}
