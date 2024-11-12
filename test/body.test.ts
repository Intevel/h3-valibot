import type { App } from 'h3'
import { createApp, defineEventHandler, toNodeListener } from 'h3'
import supertest from 'supertest'
import { beforeEach, describe, expect, it } from 'vitest'
import { useSafeValidatedBody, useValidatedBody, v } from '../src'

describe('useValidatedBody', () => {
  let app: App
  let request: any

  beforeEach(() => {
    app = createApp({ debug: false })
    request = supertest(toNodeListener(app))
  })

  const bodySchema = v.object({
    optional: v.optional(v.string()),
    required: v.boolean(),
  })

  it('returns 200 OK if body matches validation schema', async () => {
    app.use('/validate', defineEventHandler(event => useValidatedBody(event, bodySchema)))

    const res = await request.post('/validate').send({ required: true })

    expect(res.status).toEqual(200)
    expect(res.body).toMatchSnapshot()
  })

  it('throws 400 Bad Request if body does not match validation schema', async () => {
    app.use('/validate', defineEventHandler(event => useValidatedBody(event, bodySchema)))

    const res = await request.post('/validate').send({})

    expect(res.status).toEqual(400)
    expect(res.body).toMatchSnapshot()
  })

  it('doesn\'t throw 400 Bad Request if body does not match validation schema', async () => {
    app.use('/validate', defineEventHandler(event => useSafeValidatedBody(event, bodySchema)))

    const res = await request.post('/validate').send({})

    expect(res.status).toEqual(200)
    expect(res.body).toMatchSnapshot()
  })
})
