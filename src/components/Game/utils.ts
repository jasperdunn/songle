import { Dispatch, SetStateAction, useCallback, useEffect } from 'react'
import { findLastIndex } from 'common/utils'
import { Attempt, Melody } from 'components/Game/types'

export function validate(attempt: Attempt, melody: Melody): Attempt {
  const validatedAttempt: Attempt = []

  // first pass
  for (let index = 0; index < attempt.length; index++) {
    const currentNote = attempt[index]

    if (currentNote.value === melody[index]) {
      currentNote.hint = 2
    } else if (melody.includes(currentNote.value)) {
      currentNote.hint = 1
    } else {
      currentNote.hint = 0
    }

    validatedAttempt.push(currentNote)
  }

  // second pass - set 1 to a 0
  // when the attempted notes in the melody with a hint of 2 are equal to the number of times that note appears in the melody
  for (let index = 0; index < validatedAttempt.length; index++) {
    const currentNote = validatedAttempt[index]

    if (currentNote.hint !== 1) {
      continue
    }

    const totalCorrectDuplicatesInAttempt = validatedAttempt.filter(
      (n, i) => i !== index && n.value === currentNote.value && n.hint === 2
    ).length

    if (totalCorrectDuplicatesInAttempt === 0) {
      continue
    }

    const totalDuplicatesInMelody = melody.filter(
      (n) => n === currentNote.value
    ).length

    if (totalCorrectDuplicatesInAttempt === totalDuplicatesInMelody) {
      validatedAttempt[index].hint = 0
    }
  }

  return validatedAttempt
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

export function getListenableAttemptIndex(
  currentAttemptIndex: number,
  attempts: Attempt[]
): number {
  if (currentAttemptIndex === 0) {
    return 0
  }

  const currentAttempt = attempts[currentAttemptIndex]

  if (
    currentAttempt.length === attempts[currentAttemptIndex - 1].length &&
    currentAttemptIndex === attempts.length - 1 &&
    currentAttempt.every((n) => !!n.hint || n.hint === 0)
  ) {
    return currentAttemptIndex
  }

  return currentAttemptIndex - 1
}
