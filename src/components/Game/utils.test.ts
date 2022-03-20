import { validate } from 'components/Game/utils'
import each from 'jest-each'
import { attempts, ValidateParams } from './utils.test.data'

each`
  attemptedSequence                | challengeSequence                | expected
  ${attempts[0].attemptedSequence} | ${attempts[0].challengeSequence} | ${attempts[0].expected}
  ${attempts[1].attemptedSequence} | ${attempts[1].challengeSequence} | ${attempts[1].expected}
  ${attempts[2].attemptedSequence} | ${attempts[2].challengeSequence} | ${attempts[2].expected}
`.describe(
  'validate',
  ({ attemptedSequence, expected, challengeSequence }: ValidateParams) => {
    it(`"${attemptedSequence}" from "${challengeSequence}" returns "${expected}" `, () => {
      const actual = validate(attemptedSequence, challengeSequence)

      expect(actual).toStrictEqual(expected)
    })
  }
)
