import { beforeEach, describe, expect, it } from 'vitest'
import { FetchPetsByCityUseCase } from './fetch-pets-by-city-use-case'
import { PetInMemoryRepository } from '@/repositories/in-memory/pet-in-memory-repository'
import { OngsInMemoryRepository } from '@/repositories/in-memory/ongs-in-memory-repository'

let ongsRepo: OngsInMemoryRepository
let petsRepo: PetInMemoryRepository
let sut: FetchPetsByCityUseCase

describe('Fetch Pets By City Use Case', () => {
  beforeEach(() => {
    ongsRepo = new OngsInMemoryRepository()
    petsRepo = new PetInMemoryRepository(ongsRepo)
    sut = new FetchPetsByCityUseCase(petsRepo)
  })

  it('should be able to fetch all pets by a city', async () => {
    // Inserting ons
    const createdOngOne = await ongsRepo.create({
      name: 'Test ong 1',
      address: 'Maple Ave',
      city: 'Los Angeles',
      state: 'CA',
      phone: '+1 9999 999',
      email: 'test@org.com',
      password: 'my-super-secret-org-password',
    })

    const createdOngTwo = await ongsRepo.create({
      name: 'Test ong 2',
      address: 'W Washington Ave',
      city: 'Las Vegas',
      state: 'NV',
      phone: '+1 9999 999',
      email: 'test@org.com',
      password: 'my-super-secret-org-password',
    })

    // Inserting pets
    await petsRepo.create({
      name: 'New Pet 1',
      race: 'race',
      age: 4,
      energy: 3,
      independence: 'independence',
      size: 'size',
      ongId: createdOngOne.id,
    })
    await petsRepo.create({
      name: 'New Pet 2',
      race: 'race',
      age: 4,
      energy: 3,
      independence: 'independence',
      size: 'size',
      ongId: createdOngTwo.id,
    })
    await petsRepo.create({
      name: 'New Pet 3',
      race: 'race',
      age: 4,
      energy: 3,
      independence: 'independence',
      size: 'size',
      ongId: createdOngTwo.id,
    })

    // Testing las vegas pets
    const { pets: lasVegasPets } = await sut.execute(
      { city: 'Las Vegas' },
      { page: 1 },
    )
    expect(lasVegasPets).toHaveLength(2)

    // Testing los angeles pets
    const { pets: losAngelesPets } = await sut.execute(
      { city: 'Los Angeles' },
      { page: 1 },
    )
    expect(losAngelesPets).toHaveLength(1)
  })

  it('should be abe to fetch pets by query filters', async () => {
    // Inserting ons
    const createdOng = await ongsRepo.create({
      name: 'Test ong 1',
      address: 'Maple Ave',
      city: 'Los Angeles',
      state: 'CA',
      phone: '+1 9999 999',
      email: 'test@org.com',
      password: 'my-super-secret-org-password',
    })

    // Inserting pets
    await petsRepo.create({
      name: 'New Pet 1',
      race: 'race',
      age: 4,
      energy: 3,
      independence: 'independence',
      size: 'size',
      ongId: createdOng.id,
    })
    await petsRepo.create({
      name: 'New Pet 2',
      race: 'race',
      age: 4,
      energy: 3,
      independence: 'independence',
      size: 'size',
      ongId: createdOng.id,
    })
    await petsRepo.create({
      name: 'New Pet 3',
      race: 'race 2',
      age: 6,
      energy: 1,
      independence: 'independence 2',
      size: 'size 2',
      ongId: createdOng.id,
    })

    // Testing
    const { pets } = await sut.execute(
      { city: 'Los Angeles' },
      {
        page: 1,
        query: {
          race: 'race',
          age: 4,
          energy: 3,
          independence: 'independence',
          size: 'size',
        },
      },
    )

    expect(pets).toHaveLength(2)
  })
})
