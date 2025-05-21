import type { App } from 'h3'
import type { Test } from 'supertest'
import type TestAgent from 'supertest/lib/agent'
import { createApp, defineEventHandler, toNodeListener } from 'h3'
import supertest from 'supertest'
import { beforeEach, describe, expect, it } from 'vitest'
import { useSafeValidatedInput, useValidatedInput, v, vh } from '../src'

describe('input (merging body and query)', () => {
  let app: App
  let request: TestAgent<Test>

  beforeEach(() => {
    app = createApp({ debug: false })
    request = supertest(toNodeListener(app))
  })

  const bodySchema = v.object({
    optional: v.optional(v.string()),
    requiredBool: v.union([v.boolean(), vh.boolAsString]),
    requiredNum: v.union([v.number(), vh.numAsString]),
  })

  it('returns 200 OK if input matches validation schema', async () => {
    app.use('/validate', defineEventHandler(event => useValidatedInput(event, bodySchema)))

    const res = await request.post('/validate?requiredNum=1').send({ requiredBool: true })

    expect(res.status).toEqual(200)
    expect(res.body).toEqual({ requiredBool: true, requiredNum: 1 })
  })

  it('returns 200 OK if input matches validation schema in YAML format', async () => {
    app.use('/validate', defineEventHandler(event => useValidatedInput(event, bodySchema)))

    const res = await request.post('/validate?requiredBool=true')
      .set('Content-Type', 'text/yaml')
      .send(`requiredNum: 1`)

    expect(res.status).toEqual(200)
    expect(res.body).toEqual({ requiredBool: true, requiredNum: 1 })
  })

  it('returns 200 OK if input matches validation schema in TOML format', async () => {
    app.use('/validate', defineEventHandler(event => useValidatedInput(event, bodySchema)))

    const res = await request.post('/validate?requiredNum=1')
      .set('Content-Type', 'application/toml')
      .send(`requiredBool = true`)

    expect(res.status).toEqual(200)
    expect(res.body).toEqual({ requiredBool: true, requiredNum: 1 })
  })

  it('throws 400 Bad Request if input does not match validation schema', async () => {
    app.use('/validate', defineEventHandler(event => useValidatedInput(event, bodySchema)))

    const res = await request.post('/validate').send({})

    expect(res.status).toEqual(400)
    expect(res.body).toEqual({
      stack: [],
      statusCode: 400,
      statusMessage: 'Bad Request',
      data: {
        name: 'ValiError',
        issues: (await v.safeParseAsync(bodySchema, {})).issues,
      },
    })
  })

  it('doesn\'t throw 400 Bad Request if input does not match validation schema', async () => {
    app.use('/validate', defineEventHandler(event => useSafeValidatedInput(event, bodySchema)))

    const res = await request.post('/validate').send({})

    expect(res.status).toEqual(200)
    expect(res.body).toEqual(v.safeParse(bodySchema, {}))
  })
})
