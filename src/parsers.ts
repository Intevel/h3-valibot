import type { BaseIssue, BaseSchemaAsync } from 'valibot'
import { createError, getQuery, getRouterParams, type H3Event, readBody } from 'h3'
import { parseAsync } from 'valibot'

const DEFAULT_ERROR_MESSAGE = 'Bad Request'
const DEFAULT_ERROR_STATUS = 400

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function createBadRequest(error: any) {
  return createError({
    statusCode: DEFAULT_ERROR_STATUS,
    statusText: DEFAULT_ERROR_MESSAGE,
    data: error,
  })
}

/**
 * Parse and validate request query from event handler. Throws an error if validation fails.
 * @param event - A H3 event object.
 * @param schema - A Valibot Schema
 */
export async function useValidatedQuery<TInput, TOutput, TIssue extends BaseIssue<unknown>>(
  event: H3Event,
  schema: BaseSchemaAsync<TInput, TOutput, TIssue>,
): Promise<TOutput> {
  try {
    const query = getQuery(event)
    const parsed = await parseAsync(schema, query)
    return parsed
  }
  catch (error) {
    throw createBadRequest(error)
  }
}

/**
 * Parse and validate request body from event handler. Throws an error if validation fails.
 * @param event - A H3 event object.
 * @param schema - A Valibot Schema
 */
export async function useValidatedBody<TInput, TOutput, TIssue extends BaseIssue<unknown>>(
  event: H3Event,
  schema: BaseSchemaAsync<TInput, TOutput, TIssue>,
): Promise<TOutput> {
  try {
    const body = await readBody(event)
    const parsed = await parseAsync(schema, body)
    return parsed
  }
  catch (error) {
    throw createBadRequest(error)
  }
}

/**
 * Parse and validate request params from event handler. Throws an error if validation fails.
 * @param event - A H3 event object.
 * @param schema - A Valibot Schema
 */
export async function useValidatedParams<TInput, TOutput, TIssue extends BaseIssue<unknown>>(
  event: H3Event,
  schema: BaseSchemaAsync<TInput, TOutput, TIssue>,
): Promise<TOutput> {
  try {
    const params = getRouterParams(event)
    const parsed = await parseAsync(schema, params)
    return parsed
  }
  catch (error) {
    throw createBadRequest(error)
  }
}
