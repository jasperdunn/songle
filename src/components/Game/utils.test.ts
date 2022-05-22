import {
  calculateCurrentAttemptIndex,
  getListenableAttemptIndex,
  validate,
} from 'components/Game/utils'
import { test, expect } from 'vitest'
import {
  validateData,
  calculateCurrentAttemptIndexData,
  getListenableAttemptIndexData,
} from './utils.test-data'

test.each(validateData)(
  'validate(%j, %j,) -> %j',
  ({ attempt, melody, expected }) => {
    const actual = validate(attempt, melody)
    expect(actual).toStrictEqual(expected)
  }
)

test.each(calculateCurrentAttemptIndexData)(
  'calculateCurrentAttemptIndex - %# - %j',
  ({ attempts, melodyLength, numberOfPossibleAttempts, expected }) => {
    const actual = calculateCurrentAttemptIndex(
      attempts,
      melodyLength,
      numberOfPossibleAttempts
    )
    expect(actual).toStrictEqual(expected)
  }
)

test.each(getListenableAttemptIndexData)(
  'getListenableAttemptIndex - %# - %j',
  ({ currentAttemptIndex, attempts, expected }) => {
    const actual = getListenableAttemptIndex(currentAttemptIndex, attempts)
    expect(actual).toStrictEqual(expected)
  }
)
