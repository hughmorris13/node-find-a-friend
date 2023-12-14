import { OngsRepository } from '@/repositories/ongs-repository'
import { Ong } from '@prisma/client'
import { InvalidCredentialsError } from './errors/invaid-credentials-error'
import { compare } from 'bcryptjs'

export interface AuthenticateRequest {
  email: string
  password: string
}

export interface AuthenticateResponse {
  ong: Ong
}

export class AuthenticateUseCase {
  constructor(private readonly ongsRepo: OngsRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateRequest): Promise<AuthenticateResponse> {
    const ong = await this.ongsRepo.findByEmail(email)

    if (!ong) {
      throw new InvalidCredentialsError()
    }

    const doesPasswordMatch = await compare(password, ong.password)

    if (!doesPasswordMatch) {
      throw new InvalidCredentialsError()
    }

    return {
      ong,
    }
  }
}
