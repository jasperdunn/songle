import { addDash } from 'example'
import each from 'jest-each'

each`
  input         | length    | expected
  ${'012345'}   | ${3}      | ${'012-345'}
  ${'012-345'}  | ${3}      | ${'012-345'}
  ${'0123456'}  | ${3}      | ${'012-345-6'}
  ${'01234'}    | ${3}      | ${'012-34'}
  ${'-01234'}   | ${3}      | ${'012-34'}
  ${'01a234d5'} | ${3}      | ${'01a-234-d5'}
  ${''}         | ${3}      | ${''}
  `.describe(
  'addDash',
  ({
    input,
    length,
    expected,
  }: {
    input: string
    length: number
    expected: string
  }) => {
    it(`returns "${expected}" from "${input}" when length = ${length}`, () => {
      const actual = addDash(input, length)
      expect(actual).toBe(expected)
    })
  }
)
