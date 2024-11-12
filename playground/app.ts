import { createApp, createRouter, eventHandler } from 'h3'
import * as v from 'valibot'
import { useValidatedBody } from '../src/parsers'

export const app = createApp()

const router = createRouter()
app.use(router)

router.get(
  '/',
  eventHandler((event) => {
    return { path: event.path, message: 'Hello World!' }
  }),
)

router.post('/echo', eventHandler(async (event) => {
  const LoginSchema = v.object({
    email: v.pipe(v.string(), v.email()),
    password: v.pipe(v.string(), v.minLength(8)),
  })

  const body = await useValidatedBody(event, LoginSchema)
  return body
}))
