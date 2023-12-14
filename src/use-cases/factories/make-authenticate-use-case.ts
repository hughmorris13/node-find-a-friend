import { OngsPrismaRepository } from '@/repositories/prisma/ongs-prisma-repository'
import { AuthenticateUseCase } from '../authenticate-use-case'

export function makeAuthenticateUseCase() {
  return new AuthenticateUseCase(new OngsPrismaRepository())
}
