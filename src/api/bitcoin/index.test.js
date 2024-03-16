import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes from '.'

const app = () => express(apiRoot, routes)

let userSession

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  userSession = signSync(user.id)
})

test('POST /bitcoin 201 (user)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
})

test('POST /bitcoin 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})
