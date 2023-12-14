import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { app } from '@/app'
import request from 'supertest'

describe('Create Ong Controller', () => {
  beforeEach(async () => {
    await app.ready()
  })

  afterEach(async () => {
    await app.close()
  })

  it('should be able to create a new ong', async () => {
    const response = await request(app.server).post('/ongs').send({
      name: 'Test org',
      address: 'Maple Ave',
      city: 'Los Angeles',
      state: 'CA',
      phone: '+1 9999 999',
      email: 'test@org.com',
      password: 'my-super-secret-org-password',
    })

    expect(response.status).toEqual(201)
  })
})
