import {
  createError,
  getRouterParams,
  readBody,
  type H3Event,
  getQuery,
} from "h3";
import { type BaseSchemaAsync, parseAsync, Output } from "valibot";

const DEFAULT_ERROR_MESSAGE = "Bad Request";
const DEFAULT_ERROR_STATUS = 400;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function createBadRequest(error: any) {
  return createError({
    statusCode: DEFAULT_ERROR_STATUS,
    statusText: DEFAULT_ERROR_MESSAGE,
    data: error,
  });
}

/**
 * Parse and validate request query from event handler. Throws an error if validation fails.
 * @param event
 * @param schema
 */
export async function useValidatedQuery<T extends BaseSchemaAsync>(
  event: H3Event,
  schema: T
): Promise<Output<T>> {
  try {
    const query = getQuery(event);
    const parsed = await parseAsync<T>(schema, query);
    return parsed;
  } catch (error) {
    throw createBadRequest(error);
  }
}

/**
 * Parse and validate request body from event handler. Throws an error if validation fails.
 * @param event - A H3 event object.
 * @param schema - A Valibot Schema
 */
export async function useValidatedBody<T extends BaseSchemaAsync>(
  event: H3Event,
  schema: T
): Promise<Output<T>> {
  try {
    const body = await readBody(event);
    const parsed = await parseAsync<T>(schema, body);
    return parsed;
  } catch (error) {
    throw createBadRequest(error);
  }
}

/**
 * Parse and validate request body from event handler. Throws an error if validation fails.
 * @param event - A H3 event object.
 * @param schema - A Valibot Schema
 */
export async function useValidatedParams<T extends BaseSchemaAsync>(
  event: H3Event,
  schema: T
): Promise<Output<T>> {
  try {
    const params = getRouterParams(event);
    const parsed = await parseAsync<T>(schema, params);
    return parsed;
  } catch (error) {
    throw createBadRequest(error);
  }
}
