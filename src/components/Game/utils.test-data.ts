import { Melody, Attempt } from 'components/Game/types'

type CalculateCurrentAttemptIndexParams = {
  description: string
  attempts: Attempt[]
  melodyLength: number
  numberOfPossibleAttempts: number
  expected: number
}
export const calculateCurrentAttemptIndexData: CalculateCurrentAttemptIndexParams[] =
  [
    {
      description: `Returns the first index, when the first attempt isn't filled.`,
      attempts: [[{ value: 'D1' }, { value: 'D1' }], [], []],
      melodyLength: 3,
      numberOfPossibleAttempts: 3,
      expected: 0,
    },
    {
      description: `Returns the first index, when the first attempt is filled but hasn't been recorded.`,
      attempts: [[{ value: 'D1' }, { value: 'D1' }, { value: 'D#1' }], [], []],
      melodyLength: 3,
      numberOfPossibleAttempts: 3,
      expected: 0,
    },
    {
      description:
        'Returns the second index, when the first attempt has been recorded.',
      attempts: [
        [
          { value: 'D1', hint: 2 },
          { value: 'D1', hint: 2 },
          { value: 'D#1', hint: 0 },
        ],
        [],
        [],
      ],
      melodyLength: 3,
      numberOfPossibleAttempts: 3,
      expected: 1,
    },
    {
      description: `Returns the second index, when the second attempt isn't filled`,
      attempts: [
        [
          { value: 'D1', hint: 2 },
          { value: 'D1', hint: 2 },
          { value: 'D#1', hint: 1 },
        ],
        [{ value: 'D1' }, { value: 'D1' }],
        [],
      ],
      melodyLength: 3,
      numberOfPossibleAttempts: 3,
      expected: 1,
    },
    {
      description: `Returns the second index, when the second attempt is filled but hasn't been recorded`,
      attempts: [
        [
          { value: 'D1', hint: 2 },
          { value: 'D1', hint: 2 },
          { value: 'D#1', hint: 1 },
        ],
        [{ value: 'D1' }, { value: 'D1' }, { value: 'D#1' }],
        [],
      ],
      melodyLength: 3,
      numberOfPossibleAttempts: 3,
      expected: 1,
    },
    {
      description: `Returns the third index, when the second attempt is filled and has been recorded`,
      attempts: [
        [
          { value: 'D1', hint: 2 },
          { value: 'D1', hint: 2 },
          { value: 'D#1', hint: 1 },
        ],
        [
          { value: 'D1', hint: 2 },
          { value: 'D1', hint: 2 },
          { value: 'D#1', hint: 1 },
        ],
        [],
      ],
      melodyLength: 3,
      numberOfPossibleAttempts: 3,
      expected: 2,
    },
    {
      description: `Returns the last index, when the last attempt is filled and has been recorded`,
      attempts: [
        [
          { value: 'D1', hint: 2 },
          { value: 'D1', hint: 2 },
          { value: 'D#1', hint: 1 },
        ],
        [
          { value: 'D1', hint: 2 },
          { value: 'D1', hint: 2 },
          { value: 'D#1', hint: 1 },
        ],
        [
          { value: 'D1', hint: 2 },
          { value: 'D1', hint: 2 },
          { value: 'D#1', hint: 1 },
        ],
      ],
      melodyLength: 3,
      numberOfPossibleAttempts: 3,
      expected: 2,
    },
  ]

type ValidateParams = {
  attempt: Attempt
  melody: Melody
  expected: Attempt
}
export const validateData: ValidateParams[] = [
  {
    attempt: [
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
    melody: ['D1', 'D1', 'G1', 'F1', 'D1', 'G1', 'F1', 'C1', 'D1'],
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
    attempt: [
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
    melody: ['D1', 'D2', 'G3', 'F4', 'D5', 'G6', 'F7', 'C8', 'D0'],
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
    attempt: [
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
    melody: ['D1', 'D2', 'G1', 'F2', 'D1', 'G2', 'F1', 'C2', 'D1'],
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
