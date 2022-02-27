import { NoteValue, NoteHint } from 'components/Game/types'
import { validate } from 'components/Game/utils'
import each from 'jest-each'

const attempts: ValidateParams[] = [
  {
    attemptedSequence: ['D', 'D', 'D#', 'E', 'G', 'F', 'G', 'D', 'B'],
    challengeSequence: ['D', 'D', 'G', 'F', 'D', 'G', 'F', 'C', 'D'],
    expected: [2, 2, 0, 0, 1, 1, 1, 1, 0],
  },
  {
    attemptedSequence: ['D', 'A', 'D#', 'E', 'G', 'F', 'G', 'D', 'B'],
    challengeSequence: ['D', 'D', 'G', 'F', 'D', 'G', 'F', 'C', 'D'],
    expected: [2, 0, 0, 0, 1, 1, 1, 1, 0],
  },
  {
    attemptedSequence: ['F', 'A', 'D#', 'E', 'G', 'F', 'G', 'D', 'B'],
    challengeSequence: ['D', 'D', 'G', 'F', 'D', 'G', 'F', 'C', 'D'],
    expected: [1, 0, 0, 0, 1, 1, 1, 1, 0],
  },
]

type ValidateParams = {
  attemptedSequence: NoteValue[]
  challengeSequence: NoteValue[]
  expected: NoteHint[]
}
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
