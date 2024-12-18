import type { H3Event, InferEventInput } from 'h3'
import { parseTOML, parseYAML } from 'confbox'
import {
  createError,
  getQuery,
  getRequestHeader,
  getRouterParams,
  readBody as h3ReadBody,
} from 'h3'
import * as v from 'valibot'

export type VSchema<TInput, TOutput, TIssue extends v.BaseIssue<unknown>> =
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

async function readBody<T, Event extends H3Event = H3Event, _T = InferEventInput<'body', Event, T>>(event: Event): Promise<_T> {
  const contentType = getRequestHeader(event, 'Content-Type')
  const body = await h3ReadBody(event)

  if (contentType?.startsWith('application/yaml') || contentType?.startsWith('text/yaml')) {
    return parseYAML(body)
  }
  else if (contentType?.startsWith('application/toml') || contentType?.startsWith('text/toml')) {
    return parseTOML(body)
  }
  else {
    return body
  }
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
  config?: v.Config<v.InferIssue<VSchema<TInput, TOutput, TIssue>>>,
): Promise<TOutput> {
  try {
    const query = getQuery(event)
    const parsed = await v.parseAsync(schema, query, config)
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
export function useSafeValidatedQuery<
  TInput,
  TOutput,
  TIssue extends v.BaseIssue<unknown>,
>(
  event: H3Event,
  schema: VSchema<TInput, TOutput, TIssue>,
  config?: v.Config<v.InferIssue<VSchema<TInput, TOutput, TIssue>>>,
): Promise<v.SafeParseResult<VSchema<TInput, TOutput, TIssue>>> {
  const query = getQuery(event)
  return v.safeParseAsync(schema, query, config)
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
  config?: v.Config<v.InferIssue<VSchema<TInput, TOutput, TIssue>>>,
): Promise<TOutput> {
  try {
    const body = await readBody(event)

    const parsed = await v.parseAsync(schema, body, config)
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
  config?: v.Config<v.InferIssue<VSchema<TInput, TOutput, TIssue>>>,
): Promise<v.SafeParseResult<VSchema<TInput, TOutput, TIssue>>> {
  const body = readBody(event)

  return v.safeParseAsync(schema, body, config)
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
  config?: v.Config<v.InferIssue<VSchema<TInput, TOutput, TIssue>>>,
): Promise<TOutput> {
  try {
    const params = getRouterParams(event)
    const parsed = await v.parseAsync(schema, params, config)
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
export function useSafeValidatedParams<
  TInput,
  TOutput,
  TIssue extends v.BaseIssue<unknown>,
>(
  event: H3Event,
  schema: VSchema<TInput, TOutput, TIssue>,
  config?: v.Config<v.InferIssue<VSchema<TInput, TOutput, TIssue>>>,
): Promise<v.SafeParseResult<VSchema<TInput, TOutput, TIssue>>> {
  const params = getRouterParams(event)
  return v.safeParseAsync(schema, params, config)
}
