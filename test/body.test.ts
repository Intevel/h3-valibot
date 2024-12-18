import type { App } from 'h3'
import type { Test } from 'supertest'
import type TestAgent from 'supertest/lib/agent'
import { createApp, defineEventHandler, toNodeListener } from 'h3'
import supertest from 'supertest'
import { beforeEach, describe, expect, it } from 'vitest'
import { useSafeValidatedBody, useValidatedBody, v } from '../src'

describe('body', () => {
  let app: App
  let request: TestAgent<Test>

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
    expect(res.body).toEqual({ required: true })
  })

  it('returns 200 OK if body matches validation schema in YAML format', async () => {
    app.use('/validate', defineEventHandler(event => useValidatedBody(event, bodySchema)))

    const res = await request.post('/validate')
      .set('Content-Type', 'text/yaml')
      .send(`required: true`)

    expect(res.status).toEqual(200)
    expect(res.body).toEqual({ required: true })
  })

  it('returns 200 OK if body matches validation schema in TOML format', async () => {
    app.use('/validate', defineEventHandler(event => useValidatedBody(event, bodySchema)))

    const res = await request.post('/validate')
      .set('Content-Type', 'application/toml')
      .send(`required = true`)

    expect(res.status).toEqual(200)
    expect(res.body).toEqual({ required: true })
  })

  it('throws 400 Bad Request if body does not match validation schema', async () => {
    app.use('/validate', defineEventHandler(event => useValidatedBody(event, bodySchema)))

    const res = await request.post('/validate').send({})

    expect(res.status).toEqual(400)
    expect(res.body).toMatchInlineSnapshot(`
      {
        "data": {
          "issues": [
            {
              "expected": "boolean",
              "kind": "schema",
              "message": "Invalid type: Expected boolean but received undefined",
              "path": [
                {
                  "input": {},
                  "key": "required",
                  "origin": "value",
                  "type": "object",
                },
              ],
              "received": "undefined",
              "type": "boolean",
            },
          ],
          "name": "ValiError",
        },
        "stack": [],
        "statusCode": 400,
        "statusMessage": "Bad Request",
      }
    `)
  })

  it('doesn\'t throw 400 Bad Request if body does not match validation schema', async () => {
    app.use('/validate', defineEventHandler(event => useSafeValidatedBody(event, bodySchema)))

    const res = await request.post('/validate').send({})

    expect(res.status).toEqual(200)
    expect(res.body).toEqual(v.safeParse(bodySchema, {}))
  })
})
