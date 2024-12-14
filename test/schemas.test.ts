import { describe, expect, it } from 'vitest'
import { v, vh } from '../src'

describe('boolAsString', () => {
  it('parses true as string', () => {
    expect(v.parse(vh.boolAsString, 'true')).toBeTruthy()
  })
  it('parses false as string', () => {
    expect(v.parse(vh.boolAsString, 'false')).toBeFalsy()
  })
  it('throws on non-boolean string', () => {
    expect(() => v.parse(vh.boolAsString, 'hello')).toThrowError()
  })
})

describe('checkboxAsString', () => {
  it('parses "on" as boolean', () => {
    expect(v.parse(vh.checkboxAsString, 'on')).toBeTruthy()
  })
  it('parses undefined as boolean', () => {
    expect(v.parse(vh.checkboxAsString, undefined)).toBeFalsy()
  })
  it('throws on non-"on" string', () => {
    expect(() => v.parse(vh.checkboxAsString, 'hello')).toThrowError()
  })
})

describe('intAsString', () => {
  it('parses int as string', () => {
    expect(v.parse(vh.intAsString, '3')).toBe(3)
  })
  it('parses int as string with leading 0', () => {
    expect(v.parse(vh.intAsString, '03')).toBe(3)
  })
  it('parses negative int as string', () => {
    expect(v.parse(vh.intAsString, '-3')).toBe(-3)
  })
  it('throws on int as number', () => {
    expect(() => v.parse(vh.intAsString, 3)).toThrowError()
  })
  it('throws on float', () => {
    expect(() => v.parse(vh.intAsString, 3.14)).toThrowError()
  })
  it('throws on string float', () => {
    expect(() => v.parse(vh.intAsString, '3.14')).toThrowError()
  })
  it('throws on non-int string', () => {
    expect(() => v.parse(vh.intAsString, 'a3')).toThrowError()
  })
})

describe('numAsString', () => {
  it('parses number with decimal as string', () => {
    expect(v.parse(vh.numAsString, '3.14')).toBe(3.14)
  })
  it('parses number with decimal as string with leading 0', () => {
    expect(v.parse(vh.numAsString, '03.14')).toBe(3.14)
  })
  it('parses negative number with decimal as string', () => {
    expect(v.parse(vh.numAsString, '-3.14')).toBe(-3.14)
  })
  it('parses int as string', () => {
    expect(v.parse(vh.numAsString, '3')).toBe(3)
  })
  it('parses int as string with leading 0', () => {
    expect(v.parse(vh.numAsString, '03')).toBe(3)
  })
  it('parses negative int as string', () => {
    expect(v.parse(vh.numAsString, '-3')).toBe(-3)
  })
  it('throws on non-number string', () => {
    expect(() => v.parse(vh.numAsString, 'a3')).toThrowError()
  })
})

describe('uuid', () => {
  it('parses string to be a valid UUID', () => {
    expect(v.parse(vh.uuid, 'aa3452d1-ad94-4bd2-9782-1f69b3372784')).toBeTruthy()
  })
  it('parses string to not be a valid UUID', () => {
    expect(() => v.parse(vh.uuid, '123')).toThrowError()
  })
})

describe('email', () => {
  it('parses string to be a valid Email', () => {
    expect(v.parse(vh.email, 'user@example.com')).toBeTruthy()
  })
  it('parses string to not be a valid Email', () => {
    expect(() => v.parse(vh.email, 'user@example.c')).toThrowError()
  })
})
