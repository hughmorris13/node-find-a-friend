import { PetsQueryFilter, PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'

interface FetchPetByCityRequest {
  city: string
}

interface FetchPetByCityResponse {
  pets: Pet[]
}

interface FetchPetQuery {
  query?: PetsQueryFilter
  page: number
}

export class FetchPetsByCityUseCase {
  constructor(private readonly petsRepo: PetsRepository) {}

  async execute(
    { city }: FetchPetByCityRequest,
    { query, page }: FetchPetQuery,
  ): Promise<FetchPetByCityResponse> {
    const pets = await this.petsRepo.findByCity(city, page, query)
    return {
      pets,
    }
  }
}
