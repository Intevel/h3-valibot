import { createError, getQuery, getRouterParams, type H3Event, readBody } from 'h3'
import * as v from 'valibot'

type VSchema<TInput, TOutput, TIssue extends v.BaseIssue<unknown>> =
  | v.BaseSchema<TInput, TOutput, TIssue>
  | v.BaseSchemaAsync<TInput, TOutput, TIssue>

const DEFAULT_ERROR_MESSAGE = 'Bad Request'
const DEFAULT_ERROR_STATUS = 400

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
export async function useValidatedQuery<
  TInput,
  TOutput,
  TIssue extends v.BaseIssue<unknown>,
>(
  event: H3Event,
  schema: VSchema<TInput, TOutput, TIssue>,
): Promise<TOutput> {
  try {
    const query = getQuery(event)
    const parsed = await v.parseAsync(schema, query)
    return parsed
  }
  catch (error) {
    throw createBadRequest(error)
  }
}

/**
 * Parse and validate request query from event handler. Doesn't throw if validation fails.
 * @param event - A H3 event object.
 * @param schema - A Valibot Schema
 */
export async function useSafeValidatedQuery<
  TInput,
  TOutput,
  TIssue extends v.BaseIssue<unknown>,
>(
  event: H3Event,
  schema: VSchema<TInput, TOutput, TIssue>,
): Promise<v.SafeParseResult<VSchema<TInput, TOutput, TIssue>>> {
  try {
    const query = getQuery(event)
    const parsed = await v.safeParseAsync(schema, query)
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
export async function useValidatedBody<
  TInput,
  TOutput,
  TIssue extends v.BaseIssue<unknown>,
>(
  event: H3Event,
  schema: VSchema<TInput, TOutput, TIssue>,
): Promise<TOutput> {
  try {
    const body = await readBody(event)
    const parsed = await v.parseAsync(schema, body)
    return parsed
  }
  catch (error) {
    throw createBadRequest(error)
  }
}

/**
 * Parse and validate request body from event handler. Doesn't throw if validation fails.
 * @param event - A H3 event object.
 * @param schema - A Valibot Schema
 */
export async function useSafeValidatedBody<
  TInput,
  TOutput,
  TIssue extends v.BaseIssue<unknown>,
>(
  event: H3Event,
  schema: VSchema<TInput, TOutput, TIssue>,
): Promise<v.SafeParseResult<VSchema<TInput, TOutput, TIssue>>> {
  try {
    const body = await readBody(event)
    const parsed = await v.safeParseAsync(schema, body)
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
export async function useValidatedParams<
  TInput,
  TOutput,
  TIssue extends v.BaseIssue<unknown>,
>(
  event: H3Event,
  schema: VSchema<TInput, TOutput, TIssue>,
): Promise<TOutput> {
  try {
    const params = getRouterParams(event)
    const parsed = await v.parseAsync(schema, params)
    return parsed
  }
  catch (error) {
    throw createBadRequest(error)
  }
}

/**
 * Parse and validate request params from event handler. Doesn't throw if validation fails.
 * @param event - A H3 event object.
 * @param schema - A Valibot Schema
 */
export async function useSafeValidatedParams<
  TInput,
  TOutput,
  TIssue extends v.BaseIssue<unknown>,
>(
  event: H3Event,
  schema: VSchema<TInput, TOutput, TIssue>,
): Promise<v.SafeParseResult<VSchema<TInput, TOutput, TIssue>>> {
  try {
    const params = getRouterParams(event)
    const parsed = await v.safeParseAsync(schema, params)
    return parsed
  }
  catch (error) {
    throw createBadRequest(error)
  }
}
