import { Ong, Prisma } from '@prisma/client'
import { OngsRepository } from '../ongs-repository'
import { prisma } from '@/prisma'

export class OngsPrismaRepository implements OngsRepository {
  async findById(id: string): Promise<Ong | null> {
    const ong = await prisma.ong.findUnique({
      where: {
        id,
      },
    })

    return ong
  }

  async findByEmail(email: string): Promise<Ong | null> {
    const ong = await prisma.ong.findUnique({
      where: {
        email,
      },
    })

    return ong
  }

  async findByCity(city: string): Promise<Ong[] | null> {
    const ongs = await prisma.ong.findMany({
      where: {
        city,
      },
    })

    return ongs
  }

  async create(data: Prisma.OngCreateInput): Promise<Ong> {
    const ong = await prisma.ong.create({
      data,
    })

    return ong
  }
}
