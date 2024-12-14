// Original code by https://github.com/rileytomasek/zodix/blob/31bd5f2708f2eec4d0522201710dfc5ef887a16e/src/schemas.ts
import * as v from 'valibot'

/**
 * Valibot schema to parse strings that are booleans.
 * Use to parse <input type="hidden" value="true" /> values.
 * @example
 * ```ts
 * v.parse(boolAsString, 'true') -> true
 * ```
 */
export const boolAsString = v.pipe(
  v.string(),
  v.regex(/^(true|false)$/, 'Must be a boolean string ("true" or "false")'),
  v.transform(value => value === 'true'),
)

/**
 * Valibot schema to parse checkbox formdata.
 * Use to parse <input type="checkbox" /> values.
 * @example
 * ```ts
 * v.parse(checkboxAsString, 'on') -> true
 * v.parse(checkboxAsString, undefined) -> false
 * ```
 */
export const checkboxAsString = v.optional(v.pipe(
  v.picklist(['on', 'off']),
  v.transform(value => value === 'on'),
), 'off')

/**
 * Valibot schema to parse strings that are integers.
 * Use to parse  <input type="number" /> values.
 * @example
 * ```ts
 * v.parse(intAsString, '3') -> 3
 * ```
 */
export const intAsString = v.pipe(
  v.string(),
  v.transform(Number),
  v.integer('Must be an integer string'),
)

/**
 * Valibot schema to parse strings that are numbers.
 * Use to parse <input type="number" step="0.1" /> values.
 * @example
 * ```ts
 * v.parse(numAsString, '3.14') -> 3.14
 * ```
 */
export const numAsString = v.pipe(
  v.string(),
  v.decimal('Must be a number string'),
  v.transform(Number),
)

/**
 * Valibot schema to parse strings that are valid UUID.
 * @example
 * ```ts
 * v.parse(vh.uuid, '2') -> throws an error
 */
export const uuid = v.pipe(
  v.string(),
  v.uuid(),
)

/**
 * Valibot schema to parse strings that are valid Email.
 * @example
 * ```ts
 * v.parse(vh.email, 'user@example.a') -> throws an error
 */
export const email = v.pipe(
  v.string(),
  v.email(),
)
