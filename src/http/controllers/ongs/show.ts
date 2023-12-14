import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeGetOngUseCase } from '@/use-cases/factories/make-get-ong-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function show(request: FastifyRequest, reply: FastifyReply) {
  // Create the request params schema
  const showOngParamsSchema = z.object({
    id: z.string().uuid(),
  })
  // Validate the request params schema
  const { id } = showOngParamsSchema.parse(request.params)

  // Get the ong
  const getOngUseCase = makeGetOngUseCase()
  const { ong } = await getOngUseCase.execute(id)

  // Validate ong
  if (!ong) {
    throw new ResourceNotFoundError()
  }

  // Reply 200 - ong
  return reply.status(200).send({
    ong,
  })
}
