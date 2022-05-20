import { validate } from 'components/Game/utils'
import { test, describe, expect } from 'vitest'
import { attempts, ValidateParams } from './utils.test-data'

describe('validate', () => {
  test.each(attempts)(
    '%j from %j returns %j',
    ({ attemptedSequence, expected, challengeSequence }: ValidateParams) => {
      const actual = validate(attemptedSequence, challengeSequence)
      expect(actual).toStrictEqual(expected)
    }
  )
})
