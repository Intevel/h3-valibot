import type { App, Router } from 'h3'
import type { Test } from 'supertest'
import type TestAgent from 'supertest/lib/agent'
import { createApp, createRouter, defineEventHandler, toNodeListener } from 'h3'
import supertest from 'supertest'
import { beforeEach, describe, expect, it } from 'vitest'
import { useSafeValidatedParams, useValidatedParams, v, vh } from '../src'

describe('params', () => {
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
    expect(res.body).toEqual({ name: 'sandros94' })
  })

  it('throws 400 Bad Request if params does not match validation schema', async () => {
    router.get('/validate/:name', defineEventHandler(event => useValidatedParams(event, paramsSchema)))

    const res = await request.get('/validate')

    expect(res.status).toEqual(404)
    expect(res.body).toEqual({
      stack: [],
      statusCode: 404,
      statusMessage: 'Cannot find any path matching /validate.',
    })
  })

  it('doesn\'t throw 400 Bad Request if params does not match validation schema', async () => {
    router.get('/validate/:id', defineEventHandler(event => useSafeValidatedParams(event, v.object({
      id: vh.uuid,
    }))))

    const res = await request.get('/validate/2')

    expect(res.status).toEqual(200)
    expect(res.body).toMatchInlineSnapshot(`
      {
        "issues": [
          {
            "expected": null,
            "input": "2",
            "kind": "validation",
            "message": "Must be a valid UUID, received: "2"",
            "path": [
              {
                "input": {
                  "id": "2",
                },
                "key": "id",
                "origin": "value",
                "type": "object",
                "value": "2",
              },
            ],
            "received": ""2"",
            "requirement": {},
            "type": "uuid",
          },
        ],
        "output": {
          "id": "2",
        },
        "success": false,
        "typed": true,
      }
    `)
  })
})
