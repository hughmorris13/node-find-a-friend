import { Ong, Prisma } from '@prisma/client'

export interface OngsRepository {
  findById(id: string): Promise<Ong | null>
  findByEmail(email: string): Promise<Ong | null>
  findByCity(city: string): Promise<Ong[] | null>
  create(data: Prisma.OngCreateInput): Promise<Ong>
}
