import { OngsPrismaRepository } from '@/repositories/prisma/ongs-prisma-repository'
import { GetOngUseCase } from '../get-ong-use-case'

export function makeGetOngUseCase() {
  return new GetOngUseCase(new OngsPrismaRepository())
}
