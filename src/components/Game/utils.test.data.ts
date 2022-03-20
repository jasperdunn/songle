import { NoteValue, Note } from 'components/Game/types'
export type ValidateParams = {
  attemptedSequence: Note[]
  challengeSequence: NoteValue[]
  expected: Note[]
}

export const attempts: ValidateParams[] = [
  {
    attemptedSequence: [
      { value: 'D' },
      { value: 'D' },
      { value: 'D#' },
      { value: 'E' },
      { value: 'G' },
      { value: 'F' },
      { value: 'G' },
      { value: 'D' },
      { value: 'B' },
    ],
    challengeSequence: ['D', 'D', 'G', 'F', 'D', 'G', 'F', 'C', 'D'],
    expected: [
      { value: 'D', hint: 2 },
      { value: 'D', hint: 2 },
      { value: 'D#', hint: 0 },
      { value: 'E', hint: 0 },
      { value: 'G', hint: 1 },
      { value: 'F', hint: 1 },
      { value: 'G', hint: 1 },
      { value: 'D', hint: 1 },
      { value: 'B', hint: 0 },
    ],
  },
  {
    attemptedSequence: [
      { value: 'D' },
      { value: 'A' },
      { value: 'D#' },
      { value: 'E' },
      { value: 'G' },
      { value: 'F' },
      { value: 'G' },
      { value: 'D' },
      { value: 'B' },
    ],
    challengeSequence: ['D', 'D', 'G', 'F', 'D', 'G', 'F', 'C', 'D'],
    expected: [
      { value: 'D', hint: 2 },
      { value: 'A', hint: 0 },
      { value: 'D#', hint: 0 },
      { value: 'E', hint: 0 },
      { value: 'G', hint: 1 },
      { value: 'F', hint: 1 },
      { value: 'G', hint: 1 },
      { value: 'D', hint: 1 },
      { value: 'B', hint: 0 },
    ],
  },
  {
    attemptedSequence: [
      { value: 'F' },
      { value: 'A' },
      { value: 'D#' },
      { value: 'E' },
      { value: 'G' },
      { value: 'F' },
      { value: 'G' },
      { value: 'D' },
      { value: 'B' },
    ],
    challengeSequence: ['D', 'D', 'G', 'F', 'D', 'G', 'F', 'C', 'D'],
    expected: [
      { value: 'F', hint: 1 },
      { value: 'A', hint: 0 },
      { value: 'D#', hint: 0 },
      { value: 'E', hint: 0 },
      { value: 'G', hint: 1 },
      { value: 'F', hint: 1 },
      { value: 'G', hint: 1 },
      { value: 'D', hint: 1 },
      { value: 'B', hint: 0 },
    ],
  },
]
