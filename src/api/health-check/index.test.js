import request from 'supertest'
import { masterKey, apiRoot } from '../../config'
import express from '../../services/express'
import routes, { HealthCheck } from '.'

const app = () => express(apiRoot, routes)

let healthCheck

beforeEach(async () => {
  healthCheck = await HealthCheck.create({})
})

test('POST /health-checks 201 (master)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: masterKey })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
})

test('POST /health-checks 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /health-checks 200 (master)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: masterKey })
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /health-checks 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /health-checks/:id 200 (master)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${healthCheck.id}`)
    .query({ access_token: masterKey })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(healthCheck.id)
})

test('GET /health-checks/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${healthCheck.id}`)
  expect(status).toBe(401)
})

test('GET /health-checks/:id 404 (master)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: masterKey })
  expect(status).toBe(404)
})

test('PUT /health-checks/:id 200 (master)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${healthCheck.id}`)
    .send({ access_token: masterKey })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(healthCheck.id)
})

test('PUT /health-checks/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${healthCheck.id}`)
  expect(status).toBe(401)
})

test('PUT /health-checks/:id 404 (master)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: masterKey })
  expect(status).toBe(404)
})

test('DELETE /health-checks/:id 204 (master)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${healthCheck.id}`)
    .query({ access_token: masterKey })
  expect(status).toBe(204)
})

test('DELETE /health-checks/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${healthCheck.id}`)
  expect(status).toBe(401)
})

test('DELETE /health-checks/:id 404 (master)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: masterKey })
  expect(status).toBe(404)
})
