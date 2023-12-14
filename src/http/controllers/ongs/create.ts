import { FastifyReply, FastifyRequest } from 'fastify'
import { makeCrateOngUseCase } from '@/use-cases/factories/make-create-ong-use-case'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  // Create the request body schema
  const createOngRequestSchema = z.object({
    name: z.string(),
    description: z.string().default(''),
    phone: z.string(),
    address: z.string(),
    city: z.string(),
    state: z.string(),
    email: z.string(),
    password: z.string(),
  })
  // Validate the request body schema
  const body = createOngRequestSchema.parse(request.body)

  // Creating the new ong
  const createOngUseCase = makeCrateOngUseCase()
  await createOngUseCase.execute(body)

  // Reply 201 - creatred
  return reply.status(201).send()
}
