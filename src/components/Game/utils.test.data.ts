import { NoteValue, Note } from 'components/Game/types'
export type ValidateParams = {
  attemptedSequence: Note[]
  challengeSequence: NoteValue[]
  expected: Note[]
}

export const attempts: ValidateParams[] = [
  {
    attemptedSequence: [
      { value: 'D1' },
      { value: 'D1' },
      { value: 'D#1' },
      { value: 'E1' },
      { value: 'G1' },
      { value: 'F1' },
      { value: 'G1' },
      { value: 'D1' },
      { value: 'B1' },
    ],
    challengeSequence: ['D1', 'D1', 'G1', 'F1', 'D1', 'G1', 'F1', 'C1', 'D1'],
    expected: [
      { value: 'D1', hint: 2 },
      { value: 'D1', hint: 2 },
      { value: 'D#1', hint: 0 },
      { value: 'E1', hint: 0 },
      { value: 'G1', hint: 1 },
      { value: 'F1', hint: 1 },
      { value: 'G1', hint: 1 },
      { value: 'D1', hint: 1 },
      { value: 'B1', hint: 0 },
    ],
  },
  {
    attemptedSequence: [
      { value: 'D1' },
      { value: 'A2' },
      { value: 'D#3' },
      { value: 'E4' },
      { value: 'G5' },
      { value: 'F6' },
      { value: 'G7' },
      { value: 'D8' },
      { value: 'B0' },
    ],
    challengeSequence: ['D1', 'D2', 'G3', 'F4', 'D5', 'G6', 'F7', 'C8', 'D0'],
    expected: [
      { value: 'D1', hint: 2 },
      { value: 'A2', hint: 0 },
      { value: 'D#3', hint: 0 },
      { value: 'E4', hint: 0 },
      { value: 'G5', hint: 0 },
      { value: 'F6', hint: 0 },
      { value: 'G7', hint: 0 },
      { value: 'D8', hint: 0 },
      { value: 'B0', hint: 0 },
    ],
  },
  {
    attemptedSequence: [
      { value: 'D1' },
      { value: 'D1' },
      { value: 'G1' },
      { value: 'F1' },
      { value: 'D1' },
      { value: 'G1' },
      { value: 'F1' },
      { value: 'C1' },
      { value: 'D1' },
    ],
    challengeSequence: ['D1', 'D2', 'G1', 'F2', 'D1', 'G2', 'F1', 'C2', 'D1'],
    expected: [
      { value: 'D1', hint: 2 },
      { value: 'D1', hint: 1 },
      { value: 'G1', hint: 2 },
      { value: 'F1', hint: 1 },
      { value: 'D1', hint: 2 },
      { value: 'G1', hint: 1 },
      { value: 'F1', hint: 2 },
      { value: 'C1', hint: 0 },
      { value: 'D1', hint: 2 },
    ],
  },
]
