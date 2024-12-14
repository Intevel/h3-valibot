import {
  boolAsString,
  checkboxAsString,
  email,
  intAsString,
  numAsString,
  uuid,
} from './schemas'

export const vh = {
  boolAsString,
  checkboxAsString,
  email,
  intAsString,
  numAsString,
  uuid,
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
