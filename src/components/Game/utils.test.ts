import { getCurrentAttemptIndex, validate } from 'components/Game/utils'
import { test, expect } from 'vitest'
import { validateData, getCurrentAttemptIndexData } from './utils.test-data'

test.each(validateData)(
  'validate(%j, %j,) -> %j',
  ({ attempt, melody, expected }) => {
    const actual = validate(attempt, melody)
    expect(actual).toStrictEqual(expected)
  }
)

test.each(getCurrentAttemptIndexData)(
  'getCurrentAttemptIndex - %# - %j',
  ({ attempts, melodyLength, numberOfPossibleAttempts, expected }) => {
    const actual = getCurrentAttemptIndex(
      attempts,
      melodyLength,
      numberOfPossibleAttempts
    )
    expect(actual).toStrictEqual(expected)
  }
)
