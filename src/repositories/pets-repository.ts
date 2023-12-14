import { Pet, Prisma } from '@prisma/client'

export interface PetsQueryFilter {
  race?: string
  age?: number
  energy?: number
  independence?: string
  size?: string
}

export interface PetsRepository {
  findByCity(
    city: string,
    page: number,
    filters?: PetsQueryFilter,
  ): Promise<Pet[]>
  findById(id: string): Promise<Pet | null>
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
}
