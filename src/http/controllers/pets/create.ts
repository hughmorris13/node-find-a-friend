import { FastifyReply, FastifyRequest } from 'fastify'
import { makeCreatePetUseCase } from '@/use-cases/factories/make-create-pet-use-case'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  // Create the request body schema
  const createPetRequestSchema = z.object({
    name: z.string(),
    race: z.string(),
    age: z.number(),
    energy: z.number(),
    size: z.string(),
    independence: z.string(),
    ongId: z.string().uuid(),
  })
  // Validate the request body schema
  const body = createPetRequestSchema.parse(request.body)

  // Creating the new ong
  const createPetsUseCase = makeCreatePetUseCase()
  await createPetsUseCase.execute(body)

  // Reply 201 - creatred
  return reply.status(201).send()
}
