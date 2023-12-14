import { Pet, Prisma } from '@prisma/client'
import { PetsQueryFilter, PetsRepository } from '../pets-repository'
import { prisma } from '@/prisma'

export class PetsPrismaRepository implements PetsRepository {
  async findByCity(
    city: string,
    page: 20,
    filters?: PetsQueryFilter,
  ): Promise<Pet[]> {
    const pets = await prisma.pet.findMany({
      where: {
        ong: {
          city,
        },
        ...filters,
      },
      include: {
        ong: true,
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return pets
  }

  async findById(id: string): Promise<Pet | null> {
    const pet = await prisma.pet.findUnique({
      where: {
        id,
      },
      include: {
        ong: {
          select: {
            phone: true,
            email: true,
          },
        },
      },
    })

    return pet
  }

  async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const pet = await prisma.pet.create({
      data: {
        ...data,
      },
    })

    return pet
  }
}
