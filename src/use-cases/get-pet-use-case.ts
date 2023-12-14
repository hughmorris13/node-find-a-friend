import { PetsRepository } from '@/repositories/pets-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { Pet } from '@prisma/client'

interface GetPetRequest {
  id: string
}

interface GetPetResponse {
  pet: Pet
}

export class GetPetUseCase {
  constructor(private readonly petRepo: PetsRepository) {}

  async execute({ id }: GetPetRequest): Promise<GetPetResponse> {
    const pet = await this.petRepo.findById(id)

    if (!pet) {
      throw new ResourceNotFoundError()
    }

    return {
      pet,
    }
  }
}
