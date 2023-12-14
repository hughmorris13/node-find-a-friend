import { OngsRepository } from '@/repositories/ongs-repository'
import { PetsRepository } from '@/repositories/pets-repository'
import { InvalidCredentialsError } from './errors/invaid-credentials-error'
import { Pet } from '@prisma/client'

interface CreatePetRequest {
  name: string
  race: string
  age: number
  energy: number
  size: string
  independence: string
  ongId: string
}

interface CreatePetResponse {
  pet: Pet
}

export class CreatePetUseCase {
  constructor(
    private readonly petRepo: PetsRepository,
    private readonly ongRepo: OngsRepository,
  ) {}

  async execute({
    ongId,
    ...data
  }: CreatePetRequest): Promise<CreatePetResponse> {
    // Validating the org id
    const ong = await this.ongRepo.findById(ongId)
    if (!ong) {
      throw new InvalidCredentialsError()
    }

    // Creating the pet
    const pet = await this.petRepo.create({
      ongId: ong.id,
      ...data,
    })

    return {
      pet,
    }
  }
}
