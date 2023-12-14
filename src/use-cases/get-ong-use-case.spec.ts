import { OngsInMemoryRepository } from '@/repositories/in-memory/ongs-in-memory-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { GetOngUseCase } from './get-ong-use-case'
import { hash } from 'bcryptjs'

let ongRepo: OngsInMemoryRepository
let sut: GetOngUseCase

describe('Get Ong Use Case', () => {
  beforeEach(() => {
    ongRepo = new OngsInMemoryRepository()
    sut = new GetOngUseCase(ongRepo)
  })

  it('should be able to get an ong by id', async () => {
    const createdOneg = await ongRepo.create({
      name: 'Test org',
      address: 'Maple Ave',
      city: 'Los Angeles',
      state: 'CA',
      phone: '+1 9999 999',
      email: 'test@org.com',
      password: await hash('my-super-secret-org-password', 6),
    })

    const { ong } = await sut.execute(createdOneg.id)
    expect(ong).toEqual(
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
})
