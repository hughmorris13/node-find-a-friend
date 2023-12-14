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

  it('should be able to show the profile', async () => {
    const { token, user } = await createAndAuthenticateUser()

    const profileResponse = await request(app.server)
      .get('/me')
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(profileResponse.status).toEqual(200)
    expect(profileResponse.body.ong).toEqual(
      expect.objectContaining({
        ...user,
      }),
    )
  })
})
