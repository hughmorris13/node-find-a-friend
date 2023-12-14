import { FastifyInstance } from 'fastify'
import { show } from './show'
import { create } from './create'

export async function ongRoutes(app: FastifyInstance) {
  app.get('/ongs/:id', show)
  app.post('/ongs', create)
}
