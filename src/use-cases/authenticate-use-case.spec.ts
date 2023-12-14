import { OngsInMemoryRepository } from '@/repositories/in-memory/ongs-in-memory-repository'
import { OngsRepository } from '@/repositories/ongs-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { AuthenticateUseCase } from './authenticate-use-case'
import { InvalidCredentialsError } from './errors/invaid-credentials-error'
import { hash } from 'bcryptjs'

let ongsRepo: OngsRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    ongsRepo = new OngsInMemoryRepository()
    sut = new AuthenticateUseCase(ongsRepo)
  })

  it('should be able to authenticate', async () => {
    await ongsRepo.create({
      name: 'Test org',
      address: 'Maple Ave',
      city: 'Los Angeles',
      state: 'CA',
      phone: '+1 9999 999',
      email: 'test@org.com',
      password: await hash('my-super-secret-ong-password', 6),
    })

    const authenticateResponse = await sut.execute({
      email: 'test@org.com',
      password: 'my-super-secret-ong-password',
    })

    expect(authenticateResponse.ong).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        name: 'Test org',
        address: 'Maple Ave',
        city: 'Los Angeles',
        state: 'CA',
        phone: '+1 9999 999',
        email: 'test@org.com',
      }),
    )
  })

  it('should not be able to authenticate with a wrong email', async () => {
    await expect(() =>
      sut.execute({
        email: 'test@org.com',
        password: 'my-super-secret-ong-password',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with a wrong password', async () => {
    await ongsRepo.create({
      name: 'Test org',
      address: 'Maple Ave',
      city: 'Los Angeles',
      state: 'CA',
      phone: '+1 9999 999',
      email: 'test@org.com',
      password: await hash('my-super-secret-ong-password', 6),
    })

    await expect(() =>
      sut.execute({
        email: 'test@org.com',
        password: 'my-super-secret-wrong-password',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
