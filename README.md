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
import { useValidatedBody } from 'h3-valibot'

import { createApp, createRouter, eventHandler } from "h3";
import { email, minLength, string, objectAsync } from 'valibot';

export const app = createApp();
const LoginSchema = objectAsync({
    email: string([email()]),
    password: string([minLength(8)]),
 });

const router = createRouter();
app.use(router);

router.post("/login", eventHandler(async (event) => {
    const body = await useValidatedBody(event, LoginSchema);
    return body;
  }),
);
```

## Errors

h3-valibot throws an `ValiError` when the validation fails:

Exampl
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
