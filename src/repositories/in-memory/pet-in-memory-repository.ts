import { Pet, Prisma } from '@prisma/client'
import { PetsQueryFilter, PetsRepository } from '../pets-repository'
import { randomUUID } from 'crypto'
import { OngsInMemoryRepository } from './ongs-in-memory-repository'

export class PetInMemoryRepository implements PetsRepository {
  public pets: Array<Pet> = []

  private onsRepos: OngsInMemoryRepository | null = null

  constructor(ongsRepo: OngsInMemoryRepository | null = null) {
    this.onsRepos = ongsRepo
  }

  async findByCity(
    city: string,
    page: number,
    filters?: PetsQueryFilter,
  ): Promise<Pet[]> {
    if (!this.onsRepos) {
      return []
    }

    const ongs = await this.onsRepos.findByCity(city)

    if (!ongs) {
      return []
    }

    const pets = this.pets.filter((item) =>
      ongs.find((ongs) => ongs.id === item.ongId),
    )

    if (filters) {
      return pets
        .filter(
          (item) =>
            (filters.age && item.age === filters.age) ||
            (filters.energy && item.energy === filters.energy) ||
            (filters.size && item.size === filters.size) ||
            (filters.independence &&
              item.independence === filters.independence),
        )
        .slice((page - 1) * 20, page * 20)
    }

    return pets.slice((page - 1) * 20, page * 20)
  }

  async findById(id: string): Promise<Pet | null> {
    return this.pets.find((pet) => pet.id === id) ?? null
  }

  async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const pet = {
      id: data.id ?? randomUUID(),
      name: data.name,
      race: data.race,
      adopted: data.adopted ? new Date(data.adopted) : null,
      age: data.age,
      energy: data.energy,
      size: data.size,
      independence: data.independence,
      ongId: data.ongId,
    }

    this.pets.push(pet)

    return pet
  }
}
