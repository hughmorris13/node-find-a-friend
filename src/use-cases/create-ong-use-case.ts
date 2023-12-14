import { OngsRepository } from '@/repositories/ongs-repository'
import { Ong } from '@prisma/client'
import { hash } from 'bcryptjs'
import { randomUUID } from 'node:crypto'
import { EmailAlreadyExistsError } from './errors/email-already-exists-error'

interface CreateOngRequest {
  name: string
  description?: string
  phone: string
  address: string
  city: string
  state: string
  email: string
  password: string
}

interface CreateOngResponse {
  ong: Ong
}

export class CreateOngUseCase {
  constructor(private readonly ongsRepo: OngsRepository) {}

  async execute({
    password,
    ...data
  }: CreateOngRequest): Promise<CreateOngResponse> {
    // Validating the email existence
    const ongWithSameEmail = await this.ongsRepo.findByEmail(data.email)
    if (ongWithSameEmail) {
      throw new EmailAlreadyExistsError()
    }

    // Creating the org
    const ong = await this.ongsRepo.create({
      id: randomUUID(),
      password: await hash(password, 6),
      ...data,
    })

    return {
      ong,
    }
  }
}
