import { Dispatch, SetStateAction, useCallback, useEffect } from 'react'
import { findLastIndex } from 'common/utils'
import { Attempt, Melody } from 'components/Game/types'

export function validate(attempt: Attempt, melody: Melody): Attempt {
  const validatedNotes: Attempt = []

  for (let i = 0; i < attempt.length; i++) {
    const note = attempt[i]

    if (melody.includes(note.value)) {
      if (note.value === melody[i]) {
        note.hint = 2
      } else {
        note.hint = 1
      }
    } else {
      note.hint = 0
    }

    validatedNotes.push(note)
  }

  return validatedNotes
}

export function calculateCurrentAttemptIndex(
  attempts: Attempt[],
  melodyLength: number,
  numberOfPossibleAttempts: number
): number {
  const lastCompletedIndex = findLastIndex(
    attempts,
    (a) => a.length === melodyLength && a.every((n) => n.hint !== undefined)
  )

  if (lastCompletedIndex === -1) {
    return 0
  }

  if (lastCompletedIndex + 1 < numberOfPossibleAttempts) {
    return lastCompletedIndex + 1
  }

  return lastCompletedIndex
}

export function useCalculateCurrentAttemptIndex(
  melodyLength: number,
  attempts: Attempt[],
  numberOfPossibleAttempts: number,
  setCurrentAttemptIndex: Dispatch<SetStateAction<number>>
): void {
  const updateCurrentAttemptIndex = useCallback(() => {
    if (melodyLength) {
      setCurrentAttemptIndex(
        calculateCurrentAttemptIndex(
          attempts,
          melodyLength,
          numberOfPossibleAttempts
        )
      )
    }
  }, [attempts, melodyLength, setCurrentAttemptIndex, numberOfPossibleAttempts])

  useEffect(() => {
    updateCurrentAttemptIndex()
  }, [updateCurrentAttemptIndex])
}
