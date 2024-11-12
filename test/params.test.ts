import type { App, Router } from 'h3'
import type { Test } from 'supertest'
import type TestAgent from 'supertest/lib/agent'
import { createApp, createRouter, defineEventHandler, toNodeListener } from 'h3'
import supertest from 'supertest'
import { beforeEach, describe, expect, it } from 'vitest'
import { useSafeValidatedParams, useValidatedParams, v } from '../src'

describe('useValidatedParams', () => {
  let app: App
  let router: Router
  let request: TestAgent<Test>

  beforeEach(() => {
    app = createApp({ debug: false })
    router = createRouter()
    app.use(router)
    request = supertest(toNodeListener(app))
  })

  const paramsSchema = v.object({
    name: v.string(),
  })

  it('returns 200 OK if params matches validation schema', async () => {
    router.get('/validate/:name', defineEventHandler(event => useValidatedParams(event, paramsSchema)))

    const res = await request.get('/validate/sandros94')

    expect(res.status).toEqual(200)
    expect(res.body).toMatchSnapshot()
  })

  it('throws 400 Bad Request if params does not match validation schema', async () => {
    router.get('/validate/:name', defineEventHandler(event => useValidatedParams(event, paramsSchema)))

    const res = await request.get('/validate')

    expect(res.status).toEqual(404)
    expect(res.body).toMatchSnapshot()
  })

  it('doesn\'t throw 400 Bad Request if params does not match validation schema', async () => {
    router.get('/validate/:name', defineEventHandler(event => useSafeValidatedParams(event, paramsSchema)))

    const res = await request.get('/validate/2') // TODO: this is not actually correct

    expect(res.status).toEqual(200)
    expect(res.body).toMatchSnapshot()
  })
})
