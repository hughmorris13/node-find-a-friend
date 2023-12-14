import { PetsRepository } from '@/repositories/pets-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { GetPetUseCase } from './get-pet-use-case'
import { PetInMemoryRepository } from '@/repositories/in-memory/pet-in-memory-repository'
import { OngsRepository } from '@/repositories/ongs-repository'
import { OngsInMemoryRepository } from '@/repositories/in-memory/ongs-in-memory-repository'
import { randomUUID } from 'crypto'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let ongsRepo: OngsRepository
let petsRepo: PetsRepository
let sut: GetPetUseCase

describe('Get Pet Use Case', () => {
  beforeEach(() => {
    ongsRepo = new OngsInMemoryRepository()
    petsRepo = new PetInMemoryRepository()
    sut = new GetPetUseCase(petsRepo)
  })

  it('should be able to get a pet by id', async () => {
    const createdOrg = await ongsRepo.create({
      name: 'Test org',
      address: 'Maple Ave',
      city: 'Los Angeles',
      state: 'CA',
      phone: '+1 9999 999',
      email: 'test@org.com',
      password: 'my-super-secret-org-password',
    })

    const createdPet = await petsRepo.create({
      name: 'New Pet',
      race: 'race',
      age: 4,
      energy: 3,
      independence: 'independence',
      size: 'size',
      ongId: createdOrg.id,
    })

    const { pet } = await sut.execute({
      id: createdPet.id,
    })

    expect(pet).toEqual(
      expect.objectContaining({
        id: createdPet.id,
        name: 'New Pet',
        race: 'race',
        age: 4,
        energy: 3,
        independence: 'independence',
        size: 'size',
        ongId: createdOrg.id,
      }),
    )
  })

  it('should not be able to get a pet with an unexisting pet id', async () => {
    await expect(() =>
      sut.execute({
        id: randomUUID(),
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
