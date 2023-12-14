import { afterEach, beforeEach, describe, it, expect } from 'vitest'
import { app } from '@/app'
import request from 'supertest'
import { createAndAuthenticateUser } from '@/utils/tests/create-and-authenticate-user'

describe('Profile Controller', () => {
  beforeEach(async () => {
    await app.ready()
  })

  afterEach(async () => {
    await app.close()
  })

  it('should be able to refresh token', async () => {
    const { cookies } = await createAndAuthenticateUser()

    const profileResponse = await request(app.server)
      .patch('/session/refresh')
      .set('Cookie', cookies)
      .send()

    expect(profileResponse.status).toEqual(200)
    expect(profileResponse.body).toEqual({
      token: expect.any(String),
    })
  })
})
