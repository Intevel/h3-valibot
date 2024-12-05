import {
  boolAsString,
  checkboxAsString,
  intAsString,
  numAsString,
} from './schemas'

export const vh = {
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
  type VSchema,
} from './parsers'

export * as v from 'valibot'
