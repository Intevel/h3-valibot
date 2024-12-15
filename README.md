# h3-valibot

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![Github Actions CI][github-actions-ci-src]][github-actions-ci-href]
[![License][license-src]][license-href]

Schema validation for h3 using Valibot 🤖

## Install

```sh

# Using npm
npm install h3-valibot

# Using yarn
yarn add h3-valibot
```

## Validation

```ts router.ts
import { useValidatedBody, v } from 'h3-valibot'

import { createApp, createRouter, eventHandler } from 'h3';
import { email, minLength, string, objectAsync } from 'valibot';

export const app = createApp();
const LoginSchema = v.object({
    email: v.pipe(v.string(), v.email()),
    password: v.pipe(v.string(), v.minLength(8)),
 });

const router = createRouter();
app.use(router);

router.post("/login", eventHandler(async (event) => {
    const body = await useValidatedBody(event, LoginSchema);
    return body;
  }),
);
```

### Safe Validation

```ts
// same as above

router.post("/login", eventHandler(async (event) => {
    const body = await useSafeValidatedBody(event, LoginSchema);

    if (!body.success) // do something

    return body.output;
  }),
);
```

## Utils available

`h3-valibot` provides a series of utils and their safe variants (don't throw an h3 error):

- `useValidatedBody`
- `useValidatedParams`
- `useValidatedQuery`
- `useSafeValidatedBody`
- `useSafeValidatedParams`
- `useSafeValidatedQuery`

Each one accepts an h3 `event`, a valibot `schema` and optionally a parser `config`.

### Helpers

It also provides a set of helpers via `vh` object, mainly related to string validation, particularly useful during the prototyping phase of any project. For production use we still suggest to create dedicated schemas with project-related error messages and fallbacks.

- `boolAsString`
- `checkboxAsString`
- `intAsString`
- `numAsString`
- `email`
- `uuid`

For more details or examples please refer to their JSdocs or [source code](/src/core/schemas.ts).

## Errors

`h3-valibot` throws an `ValiError` when the validation fails:

Example
```json
{
  "statusCode": 400,
  "statusMessage": "Bad Request",
  "stack": [],
  "data": {
    "issues": [
      {
        "validation": "email",
        "origin": "value",
        "message": "Invalid email",
        "input": "github@conner-bachmande",
        "path": [
          {
            "schema": "object",
            "input": {
              "email": "github@conner-bachmande",
              "password": "12345678"
            },
            "key": "email",
            "value": "github@conner-bachmande"
          }
        ],
        "reason": "string"
      }
    ],
    "name": "ValiError"
  }
}
```

## Nuxt auto-imports

This library supports Nuxt's auto-imports, just add it in your `nuxt.config.ts`:

```ts
export default defineNuxtConfig({
  modules: [
    // ...
    'h3-valibot/nuxt',
  ],
})
```

## License

Published under MIT - Made with ❤️ by Conner Bachmann

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/h3-valibot/latest.svg
[npm-version-href]: https://npmjs.com/package/h3-valibot
[npm-downloads-src]: https://img.shields.io/npm/dt/h3-valibot.svg
[npm-downloads-href]: https://npmjs.com/package/h3-valibot
[github-actions-ci-src]: https://github.com/intevel/h3-valibot/actions/workflows/ci.yml/badge.svg
[github-actions-ci-href]: https://github.com/intevel/h3-valibot/actions?query=workflow%3Aci
[license-src]: https://img.shields.io/npm/l/h3-valibot.svg
[license-href]: https://npmjs.com/package/h3-valibot
