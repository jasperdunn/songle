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
      attempts: [[{ name: 'D1' }, { name: 'D1' }], [], []],
      melodyLength: 3,
      numberOfPossibleAttempts: 3,
      expected: 0,
    },
    {
      description: `Returns the first index, when the first attempt is filled but hasn't been recorded.`,
      attempts: [[{ name: 'D1' }, { name: 'D1' }, { name: 'D#1' }], [], []],
      melodyLength: 3,
      numberOfPossibleAttempts: 3,
      expected: 0,
    },
    {
      description:
        'Returns the second index, when the first attempt has been recorded.',
      attempts: [
        [
          { name: 'D1', hint: 2 },
          { name: 'D1', hint: 2 },
          { name: 'D#1', hint: 0 },
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
          { name: 'D1', hint: 2 },
          { name: 'D1', hint: 2 },
          { name: 'D#1', hint: 1 },
        ],
        [{ name: 'D1' }, { name: 'D1' }],
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
          { name: 'D1', hint: 2 },
          { name: 'D1', hint: 2 },
          { name: 'D#1', hint: 1 },
        ],
        [{ name: 'D1' }, { name: 'D1' }, { name: 'D#1' }],
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
          { name: 'D1', hint: 2 },
          { name: 'D1', hint: 2 },
          { name: 'D#1', hint: 1 },
        ],
        [
          { name: 'D1', hint: 2 },
          { name: 'D1', hint: 2 },
          { name: 'D#1', hint: 1 },
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
          { name: 'D1', hint: 2 },
          { name: 'D1', hint: 2 },
          { name: 'D#1', hint: 1 },
        ],
        [
          { name: 'D1', hint: 2 },
          { name: 'D1', hint: 2 },
          { name: 'D#1', hint: 1 },
        ],
        [
          { name: 'D1', hint: 2 },
          { name: 'D1', hint: 2 },
          { name: 'D#1', hint: 1 },
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
      { name: 'D1' },
      { name: 'D1' },
      { name: 'D#1' },
      { name: 'E1' },
      { name: 'G1' },
      { name: 'F1' },
      { name: 'G1' },
      { name: 'D1' },
      { name: 'B1' },
    ],
    melody: ['D1', 'D1', 'G1', 'F1', 'D1', 'G1', 'F1', 'C1', 'D1'],
    expected: [
      { name: 'D1', hint: 2 },
      { name: 'D1', hint: 2 },
      { name: 'D#1', hint: 0 },
      { name: 'E1', hint: 0 },
      { name: 'G1', hint: 1 },
      { name: 'F1', hint: 1 },
      { name: 'G1', hint: 1 },
      { name: 'D1', hint: 1 },
      { name: 'B1', hint: 0 },
    ],
  },
  {
    attempt: [
      { name: 'D1' },
      { name: 'D1' },
      { name: 'G1' },
      { name: 'F1' },
      { name: 'D1' },
      { name: 'G1' },
      { name: 'F1' },
      { name: 'C1' },
      { name: 'D1' },
    ],
    melody: ['D1', 'D2', 'G1', 'F2', 'D1', 'G2', 'F1', 'C2', 'D1'],
    expected: [
      { name: 'D1', hint: 2 },
      { name: 'D1', hint: 0 },
      { name: 'G1', hint: 2 },
      { name: 'F1', hint: 0 },
      { name: 'D1', hint: 2 },
      { name: 'G1', hint: 0 },
      { name: 'F1', hint: 2 },
      { name: 'C1', hint: 0 },
      { name: 'D1', hint: 2 },
    ],
  },
  {
    attempt: [
      { name: 'D1' },
      { name: 'C1' },
      { name: 'G1' },
      { name: 'F1' },
      { name: 'C1' },
      { name: 'G1' },
      { name: 'F1' },
      { name: 'C1' },
      { name: 'F1' },
    ],
    melody: ['D1', 'D1', 'G1', 'F1', 'D1', 'G1', 'F1', 'C1', 'D1'],
    expected: [
      { name: 'D1', hint: 2 },
      { name: 'C1', hint: 0 },
      { name: 'G1', hint: 2 },
      { name: 'F1', hint: 2 },
      { name: 'C1', hint: 0 },
      { name: 'G1', hint: 2 },
      { name: 'F1', hint: 2 },
      { name: 'C1', hint: 2 },
      { name: 'F1', hint: 0 },
    ],
  },
]

type GetListenableAttemptIndexDataParams = {
  currentAttemptIndex: number
  attempts: Attempt[]
  expected: number
}
export const getListenableAttemptIndexData: GetListenableAttemptIndexDataParams[] =
  [
    {
      currentAttemptIndex: 0,
      attempts: [[], []],
      expected: 0,
    },
    {
      currentAttemptIndex: 1,
      attempts: [
        [
          { name: 'D1', hint: 2 },
          { name: 'D1', hint: 2 },
          { name: 'D#1', hint: 0 },
        ],
        [],
      ],
      expected: 0,
    },
    {
      currentAttemptIndex: 1,
      attempts: [
        [
          { name: 'D1', hint: 2 },
          { name: 'D1', hint: 2 },
          { name: 'D#1', hint: 0 },
        ],
        [
          { name: 'D1', hint: 2 },
          { name: 'D1', hint: 2 },
          { name: 'D#1', hint: 0 },
        ],
      ],
      expected: 1,
    },
  ]
