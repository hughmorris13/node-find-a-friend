import { PetsPrismaRepository } from '@/repositories/prisma/pets-prisma-repository'
import { GetPetUseCase } from '../get-pet-use-case'

export function makeGetPetUseCase() {
  return new GetPetUseCase(new PetsPrismaRepository())
}
