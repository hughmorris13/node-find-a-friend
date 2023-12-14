import { FastifyReply, FastifyRequest } from 'fastify'
import { makeFetchUseCase } from '@/use-cases/factories/make-fetch-use-case'
import { z } from 'zod'

export async function list(request: FastifyRequest, reply: FastifyReply) {
  // Create the request params schema
  const fetchPetsParamsSchema = z.object({
    city: z.string(),
  })
  // Validate the request params schema
  const { city } = fetchPetsParamsSchema.parse(request.params)

  // Create the request query schema
  const fetchPetsQuerySchema = z.object({
    race: z.string().optional(),
    age: z.coerce.number().optional(),
    energy: z.coerce.number().optional(),
    independence: z.string().optional(),
    size: z.string().optional(),
    page: z.coerce.number().default(1),
  })
  // Validate the request query schema
  const { page, ...query } = fetchPetsQuerySchema.parse(request.query)

  const fetchPetsByCityUseCase = makeFetchUseCase()
  const { pets } = await fetchPetsByCityUseCase.execute(
    { city },
    { page, query },
  )

  return reply.status(200).send({
    pets,
  })
}
