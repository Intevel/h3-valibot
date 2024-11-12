import {
  useSafeValidatedBody,
  useSafeValidatedParams,
  useSafeValidatedQuery,
  useValidatedBody,
  useValidatedParams,
  useValidatedQuery,
} from './parsers'

import {
  boolAsString,
  checkboxAsString,
  intAsString,
  numAsString,
} from './schemas'

export const vh = {
  useSafeValidatedBody,
  useSafeValidatedParams,
  useSafeValidatedQuery,
  useValidatedBody,
  useValidatedParams,
  useValidatedQuery,
  boolAsString,
  checkboxAsString,
  intAsString,
  numAsString,
}

export {
  useSafeValidatedBody,
  useSafeValidatedParams,
  useSafeValidatedQuery,
  useValidatedBody,
  useValidatedParams,
  useValidatedQuery,
} from './parsers'

export * as v from 'valibot'
