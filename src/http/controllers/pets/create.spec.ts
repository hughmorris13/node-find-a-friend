import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { app } from '@/app'
import { prisma } from '@/prisma'
import { hash } from 'bcryptjs'
import { createAndAuthenticateUser } from '@/utils/tests/create-and-authenticate-user'
import request from 'supertest'
import { randomUUID } from 'crypto'

describe('Create Pet Controller', () => {
  beforeEach(async () => {
    await app.ready()
  })

  afterEach(async () => {
    await app.close()
  })

  it('should be able to create a new pet', async () => {
    const { token } = await createAndAuthenticateUser()

    const ong = await prisma.ong.create({
      data: {
        name: 'Test org',
        address: 'Maple Ave',
        city: 'Los Angeles',
        state: 'CA',
        phone: '+1 9999 999',
        email: `${await randomUUID()}@test.com`,
        password: await hash('my-super-secret-org-password', 6),
      },
    })

    const response = await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'New Pet',
        race: 'race',
        age: 4,
        energy: 3,
        independence: 'independence',
        size: 'size',
        ongId: ong.id,
      })

    expect(response.status).toEqual(201)
  })
})
