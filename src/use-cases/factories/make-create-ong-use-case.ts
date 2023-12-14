import { PetsPrismaRepository } from '@/repositories/prisma/pets-prisma-repository'
import { CreateOngUseCase } from '../create-ong-use-case'
import { OngsPrismaRepository } from '@/repositories/prisma/ongs-prisma-repository'

export function makeCrateOngUseCase() {
  return new CreateOngUseCase(new OngsPrismaRepository())
}
