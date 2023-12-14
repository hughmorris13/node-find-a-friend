import { app } from '@/app'
import { prisma } from '@/prisma'
import { hash } from 'bcryptjs'
import { describe, afterEach, beforeEach, it, expect } from 'vitest'
import request from 'supertest'

describe('Show Pet Controller', () => {
  beforeEach(async () => {
    await app.ready()
  })

  afterEach(async () => {
    await app.close()
  })

  it('should be able to show the details of a pet', async () => {
    const ong = await prisma.ong.create({
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

    const pet = await prisma.pet.create({
      data: {
        name: 'New Pet',
        race: 'race',
        age: 4,
        energy: 3,
        independence: 'independence',
        size: 'size',
        ongId: ong.id,
      },
    })

    const response = await request(app.server).get(`/pets/${pet.id}`).send()

    expect(response.status).toEqual(200)
    expect(response.body).toEqual({
      pet: expect.objectContaining({
        id: expect.any(String),
        name: 'New Pet',
        race: 'race',
        age: 4,
        energy: 3,
        independence: 'independence',
        size: 'size',
        ongId: ong.id,
      }),
    })
  })
})
