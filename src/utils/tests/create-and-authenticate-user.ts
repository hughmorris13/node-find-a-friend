import { app } from '@/app'
import { prisma } from '@/prisma'
import { hash } from 'bcryptjs'
import { randomUUID } from 'crypto'
import request from 'supertest'

export async function createAndAuthenticateUser() {
  const credentials = {
    email: `${await randomUUID()}@test.com`,
    password: 'my-super-secret-org-password',
  }

  const { password, ...user } = await prisma.ong.create({
    data: {
      name: 'Test org',
      address: 'Maple Ave',
      city: 'Los Angeles',
      state: 'CA',
      phone: '+1 9999 999',
      email: credentials.email,
      password: await hash(credentials.password, 6),
    },
  })

  const authResponse = await request(app.server)
    .post('/session')
    .send({
      ...credentials,
    })

  const { token } = authResponse.body

  const cookies = authResponse.get('Set-Cookie')

  return {
    token,
    cookies,
    user,
    credentials,
  }
}
