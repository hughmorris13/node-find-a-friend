import { afterEach, beforeEach, describe, it, expect } from 'vitest'
import { app } from '@/app'
import { prisma } from '@/prisma'
import { hash } from 'bcryptjs'
import request from 'supertest'

describe('Authenticate Controller', () => {
  beforeEach(async () => {
    await app.ready()
  })

  afterEach(async () => {
    await app.close()
  })

  it('should be able to authenticate', async () => {
    await prisma.ong.create({
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

    const response = await request(app.server).post('/session').send({
      email: 'test@org.com',
      password: 'my-super-secret-org-password',
    })

    expect(response.status).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
  })
})
