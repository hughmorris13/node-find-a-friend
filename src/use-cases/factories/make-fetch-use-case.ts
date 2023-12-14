import { PetsPrismaRepository } from '@/repositories/prisma/pets-prisma-repository'
import { FetchPetsByCityUseCase } from '../fetch-pets-by-city-use-case'

export function makeFetchUseCase() {
  return new FetchPetsByCityUseCase(new PetsPrismaRepository())
}
