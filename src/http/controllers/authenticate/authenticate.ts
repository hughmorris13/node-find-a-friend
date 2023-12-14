import { OngsPrismaRepository } from '@/repositories/prisma/ongs-prisma-repository'
import { AuthenticateUseCase } from '@/use-cases/authenticate-use-case'
import { InvalidCredentialsError } from '@/use-cases/errors/invaid-credentials-error'
import { makeAuthenticateUseCase } from '@/use-cases/factories/make-authenticate-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  // Create the request body schema
  const authenticateRequestBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
  })
  // Validate the request body schema
  const { email, password } = authenticateRequestBodySchema.parse(request.body)

  try {
    // Trying to authenticate
    const authenticateUseCase = makeAuthenticateUseCase()
    const { ong } = await authenticateUseCase.execute({ email, password })

    // Creating the access token
    const token = await reply.jwtSign(
      {},
      {
        sign: {
          sub: ong.id,
        },
      },
    )

    // Creating the refresh token
    const refreshToken = await reply.jwtSign(
      {},
      {
        sign: {
          sub: ong.id,
          expiresIn: '7d',
        },
      },
    )

    return reply
      .setCookie('refreshToken', refreshToken, {
        path: '/',
        secure: true,
        sameSite: true,
        httpOnly: true,
      })
      .status(200)
      .send({ token })
  } catch (error) {
    // On error
    if (error instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: error.message })
    }

    throw error
  }
}
