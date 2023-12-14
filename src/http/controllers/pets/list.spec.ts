import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { app } from '@/app'
import { prisma } from '@/prisma'
import { hash } from 'bcryptjs'
import request from 'supertest'

describe('Create Pet Controller', () => {
  beforeEach(async () => {
    await app.ready()
  })

  afterEach(async () => {
    await app.close()
  })

  it('should be able to create a new pet', async () => {
    const ong1 = await prisma.ong.create({
      data: {
        name: 'Test org',
        address: 'Maple Ave',
        city: 'Los Angeles',
        state: 'CA',
        phone: '+1 9999 999',
        email: 'test@org.com',
        password: await hash('my-super-secret-org-password', 6),
      },
    })

    const ong2 = await prisma.ong.create({
      data: {
        name: 'Test ong 2',
        address: 'W Washington Ave',
        city: 'Las Vegas',
        state: 'NV',
        phone: '+1 9999 999',
        email: 'test2@org.com',
        password: await hash('my-super-secret-org-password', 6),
      },
    })

    await prisma.pet.create({
      data: {
        name: 'New Pet 1',
        race: 'race 1',
        age: 4,
        energy: 3,
        independence: 'independence',
        size: 'size',
        ongId: ong1.id,
      },
    })

    await prisma.pet.create({
      data: {
        name: 'New Pet 2',
        race: 'race 2',
        age: 4,
        energy: 3,
        independence: 'independence',
        size: 'size',
        ongId: ong1.id,
      },
    })

    await prisma.pet.create({
      data: {
        name: 'New Pet 3',
        race: 'race 3',
        age: 4,
        energy: 3,
        independence: 'independence',
        size: 'size',
        ongId: ong2.id,
      },
    })

    let response = await request(app.server)
      .get(`/pets/city/${ong1.city}`)
      .send()

    expect(response.status).toEqual(200)
    expect(response.body.pets).toHaveLength(2)

    response = await request(app.server)
      .get(`/pets/city/${ong1.city}`)
      .query({
        race: 'race 1',
        age: 4,
        energy: 3,
      })
      .send()
    expect(response.body.pets).toHaveLength(1)
  })
})
