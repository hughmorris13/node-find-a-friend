import { OngsRepository } from '@/repositories/ongs-repository'
import { PetsRepository } from '@/repositories/pets-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreatePetUseCase } from './create-pet-use-case'
import { OngsInMemoryRepository } from '@/repositories/in-memory/ongs-in-memory-repository'
import { PetInMemoryRepository } from '@/repositories/in-memory/pet-in-memory-repository'
import { randomUUID } from 'crypto'
import { InvalidCredentialsError } from './errors/invaid-credentials-error'

let ongsRepo: OngsRepository
let petsRepo: PetsRepository
let sut: CreatePetUseCase

describe('Create Pet Use Case', () => {
  beforeEach(() => {
    ongsRepo = new OngsInMemoryRepository()
    petsRepo = new PetInMemoryRepository()
    sut = new CreatePetUseCase(petsRepo, ongsRepo)
  })

  it('should be able to create a pet', async () => {
    const ong = await ongsRepo.create({
      name: 'Test org',
      address: 'Maple Ave',
      city: 'Los Angeles',
      state: 'CA',
      phone: '+1 9999 999',
      email: 'test@org.com',
      password: 'my-super-secret-org-password',
    })

    const { pet } = await sut.execute({
      name: 'New Pet',
      race: 'race',
      age: 4,
      energy: 3,
      independence: 'independence',
      size: 'size',
      ongId: ong.id,
    })

    expect(pet).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        name: 'New Pet',
        race: 'race',
        age: 4,
        energy: 3,
        independence: 'independence',
        size: 'size',
        ongId: ong.id,
      }),
    )
  })

  it('should not be able to create a new pet with a wrong ong id', async () => {
    await expect(() =>
      sut.execute({
        name: 'New Pet',
        race: 'race',
        age: 4,
        energy: 3,
        independence: 'independence',
        size: 'size',
        ongId: randomUUID(),
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
