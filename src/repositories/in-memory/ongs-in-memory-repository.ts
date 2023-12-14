import { Ong, Prisma } from '@prisma/client'
import { OngsRepository } from '../ongs-repository'
import { randomUUID } from 'crypto'

export class OngsInMemoryRepository implements OngsRepository {
  public ongs: Array<Ong> = []

  async findByEmail(email: string): Promise<Ong | null> {
    return this.ongs.find((item) => item.email === email) ?? null
  }

  async findById(id: string): Promise<Ong | null> {
    return this.ongs.find((item) => item.id === id) ?? null
  }

  async findByCity(city: string): Promise<Ong[] | null> {
    return this.ongs.filter((item) => item.city === city) ?? null
  }

  async create(data: Prisma.OngCreateInput): Promise<Ong> {
    const ong = {
      id: data.id ?? randomUUID(),
      name: data.name,
      description: data.description ?? null,
      phone: data.phone,
      address: data.address,
      city: data.city,
      state: data.state,
      email: data.email,
      password: data.password,
    }

    this.ongs.push(ong)

    return ong
  }
}
