import { createApp, createRouter, eventHandler } from "h3";
import { email, minLength, string, objectAsync } from 'valibot';
import { useValidatedBody } from '../src/parsers'

export const app = createApp();

const router = createRouter();
app.use(router);

router.get(
  "/",
  eventHandler((event) => {
    return { path: event.path, message: "Hello World!" };
  }),
);

router.post("/echo", eventHandler(async (event) => {
    const LoginSchema = objectAsync({
        email: string([email()]),
        password: string([minLength(8)]),
    });

    const body = await useValidatedBody(event, LoginSchema);
    return body;
  }),
);
