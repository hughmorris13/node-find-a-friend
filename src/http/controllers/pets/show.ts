import { FastifyReply, FastifyRequest } from 'fastify'
import { makeGetPetUseCase } from '@/use-cases/factories/make-get-pet-use-case'
import { z } from 'zod'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'

export async function show(request: FastifyRequest, reply: FastifyReply) {
  // Create the request params schema
  const showPetParamsSchema = z.object({
    id: z.string().uuid(),
  })

  // Validate the request params schema
  const id = showPetParamsSchema.parse(request.params)

  // Get the pet
  const getPetUseCase = makeGetPetUseCase()
  const { pet } = await getPetUseCase.execute(id)

  if (!pet) {
    throw new ResourceNotFoundError()
  }

  // Reply 200 - pet
  return reply.status(200).send({
    pet,
  })
}
