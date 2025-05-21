// Original code by https://github.com/rileytomasek/zodix/blob/31bd5f2708f2eec4d0522201710dfc5ef887a16e/src/schemas.ts
import * as v from 'valibot'

/**
 * Valibot schema to parse strings that are booleans.
 * Use to parse `<input type="hidden" value="true" />` values.
 * @example
 * ```ts
 * v.parse(boolAsString, 'true') -> true
 * ```
 */
export const boolAsString = v.pipe(
  v.string(),
  v.regex(/^(true|false)$/, e => `Must be a boolean string ("true" or "false"), received: ${e.received}`),
  v.transform(value => value === 'true'),
)

/**
 * Valibot schema to parse checkbox formdata.
 * Use to parse `<input type="checkbox" />` values.
 * @example
 * ```ts
 * v.parse(checkboxAsString, 'on') -> true
 * v.parse(checkboxAsString, undefined) -> false
 * ```
 */
export const checkboxAsString = v.optional(v.pipe(
  v.picklist(['on', 'off'], e => `Must be a checkbox data ("on" or "off"), received: ${e.received}`),
  v.transform(value => value === 'on'),
), 'off')

/**
 * Valibot schema to parse strings that are integers.
 * Use to parse  `<input type="number" />` values.
 * @example
 * ```ts
 * v.parse(intAsString, '3') -> 3
 * ```
 */
export const intAsString = v.pipe(
  v.string(),
  v.transform(Number),
  v.integer(e => `Must be an integer string, received: ${e.received}`),
)

/**
 * Valibot schema to parse strings that are numbers.
 * Use to parse `<input type="number" step="0.1" />` values.
 * @example
 * ```ts
 * v.parse(numAsString, '3.14') -> 3.14
 * ```
 */
export const numAsString = v.pipe(
  v.string(),
  v.decimal(e => `Must be a number string, received: ${e.received}`),
  v.transform(Number),
)

/**
 * Valibot schema to parse strings that are dates or datetime in ISO format.
 * Use to parse `<input type="date" />` and `<input type="datetime-local" />` values.
 * @example
 * ```ts
 * v.parse(dateAsString, '2022-01-01') -> new Date('2022-01-01')
 * v.parse(dateAsString, '2022-01-01T12:00:00') -> new Date('2022-01-01T12:00:00')
 * ```
 */
export const dateAsString = v.pipe(
  v.union([
    v.pipe(
      v.string(),
      v.isoDate(e => `Must be a date string in ISO format, received: ${e.received}`),
    ),
    v.pipe(
      v.string(),
      v.isoDateTime(e => `Must be a datetime string in ISO format, received: ${e.received}`),
    ),
  ]),
  v.transform(d => new Date(d)),
)

/**
 * Valibot schema to parse strings that are valid UUID.
 * @example
 * ```ts
 * v.parse(vh.uuid, '2') -> throws an error
 */
export const uuid = v.pipe(
  v.string(),
  v.uuid(e => `Must be a valid UUID, received: ${e.received}`),
)

/**
 * Valibot schema to parse strings that are valid Email.
 * @example
 * ```ts
 * v.parse(vh.email, 'user@example') -> throws an error
 */
export const email = v.pipe(
  v.string(),
  v.trim(),
  v.nonEmpty('Please enter your email.'),
  v.email(e => `Must be a valid Email, received: ${e.received}`),
  v.toLowerCase(),
)
