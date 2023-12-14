import { PetsPrismaRepository } from '@/repositories/prisma/pets-prisma-repository'
import { CreatePetUseCase } from '../create-pet-use-case'
import { OngsPrismaRepository } from '@/repositories/prisma/ongs-prisma-repository'

export function makeCreatePetUseCase() {
  return new CreatePetUseCase(
    new PetsPrismaRepository(),
    new OngsPrismaRepository(),
  )
}
