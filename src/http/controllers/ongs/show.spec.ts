import { app } from '@/app'
import { prisma } from '@/prisma'
import { hash } from 'bcryptjs'
import { describe, afterEach, beforeEach, it, expect } from 'vitest'
import request from 'supertest'

describe('Show Ong Controller', () => {
  beforeEach(async () => {
    await app.ready()
  })

  afterEach(async () => {
    await app.close()
  })

  it('should be able to show the details of an ong', async () => {
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

    const response = await request(app.server).get(`/ongs/${ong.id}`).send()

    expect(response.status).toEqual(200)
    expect(response.body).toEqual({
      ong: expect.objectContaining({
        id: expect.any(String),
        name: 'Test org',
        address: 'Maple Ave',
        city: 'Los Angeles',
        state: 'CA',
        phone: '+1 9999 999',
      }),
    })
  })
})
