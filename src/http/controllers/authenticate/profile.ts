import { makeGetOngUseCase } from '@/use-cases/factories/make-get-ong-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  const { sub } = request.user

  if (!sub) {
    return reply.status(400).send({ message: 'Unauthorized.' })
  }

  const getOngUseCase = makeGetOngUseCase()
  const { ong } = await getOngUseCase.execute(sub)

  if (!ong) {
    return reply.status(400).send({ message: 'Unauthorized.' })
  }

  const { password, ...ongWithoutPassword } = ong

  return reply.status(200).send({
    ong: ongWithoutPassword,
  })
}
