import { beforeEach, describe, expect, it } from 'vitest'
import { OngsInMemoryRepository } from '@/repositories/in-memory/ongs-in-memory-repository'
import { CreateOngUseCase } from './create-ong-use-case'
import { OngsRepository } from '@/repositories/ongs-repository'
import { EmailAlreadyExistsError } from './errors/email-already-exists-error'
import { compare } from 'bcryptjs'

let ongRepo: OngsRepository
let sut: CreateOngUseCase

describe('Create ORG Use Case', () => {
  beforeEach(async () => {
    ongRepo = new OngsInMemoryRepository()
    sut = new CreateOngUseCase(ongRepo)
  })

  it('should be able to create a new ong', async () => {
    const { ong } = await sut.execute({
      name: 'Test org',
      address: 'Maple Ave',
      city: 'Los Angeles',
      state: 'CA',
      phone: '+1 9999 999',
      email: 'test@org.com',
      password: 'my-super-secret-org-password',
    })

    expect(ong).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        name: 'Test org',
        address: 'Maple Ave',
        city: 'Los Angeles',
        state: 'CA',
        phone: '+1 9999 999',
        email: 'test@org.com',
        password: expect.any(String),
      }),
    )
  })

  it('should be able to hash an ong`s password', async () => {
    const { ong } = await sut.execute({
      name: 'Test org',
      address: 'Maple Ave',
      city: 'Los Angeles',
      state: 'CA',
      phone: '+1 9999 999',
      email: 'test@org.com',
      password: 'my-super-secret-org-password',
    })

    const isPasswordCorrectlyHashed = await compare(
      'my-super-secret-org-password',
      ong.password,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to create an ong with an email that already exists', async () => {
    await sut.execute({
      name: 'Test org',
      address: 'Maple Ave',
      city: 'Los Angeles',
      state: 'CA',
      phone: '+1 9999 999',
      email: 'test@org.com',
      password: 'my-super-secret-org-password',
    })

    await expect(() =>
      sut.execute({
        name: 'Test org',
        address: 'Maple Ave',
        city: 'Los Angeles',
        state: 'CA',
        phone: '+1 9999 999',
        email: 'test@org.com',
        password: 'my-super-secret-org-password',
      }),
    ).rejects.toBeInstanceOf(EmailAlreadyExistsError)
  })
})
