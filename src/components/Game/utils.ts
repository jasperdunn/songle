import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react'
import { findLastIndex } from 'common/utils'
import { Attempt, Challenge, Melody } from 'components/Game/types'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { getErrorMessage } from 'common/error'

export function validate(attempt: Attempt, melody: Melody): Attempt {
  const validatedAttempt: Attempt = []

  // first pass
  for (let i = 0; i < attempt.length; i++) {
    const currentNote = attempt[i]

    if (currentNote.value === melody[i]) {
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
  for (let i = 0; i < validatedAttempt.length; i++) {
    const currentNote = validatedAttempt[i]

    if (currentNote.hint !== 1) {
      continue
    }

    const totalCorrectDuplicatesInAttempt = validatedAttempt.filter(
      (note, index) =>
        index !== i && note.value === currentNote.value && note.hint === 2
    ).length

    if (totalCorrectDuplicatesInAttempt === 0) {
      continue
    }

    const totalDuplicatesInMelody = melody.filter(
      (noteValue) => noteValue === currentNote.value
    ).length

    if (totalCorrectDuplicatesInAttempt === totalDuplicatesInMelody) {
      validatedAttempt[i].hint = 0
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

export function getTimezoneOffset(date: Date): number {
  return (date.getTimezoneOffset() / 60) * -1
}

export function getLocalDateString(date: Date): string {
  return new Date(date.setHours(getTimezoneOffset(date), 0, 0, 0))
    .toJSON()
    .split('T')[0]
}

export function getChallengeUrl(
  type: 'midi' | 'json',
  gameDateString: string
): string {
  const today = new Date()
  const timezoneOffset = getTimezoneOffset(today)

  return `https://songle-wrangler.jasperdunn.workers.dev/${gameDateString}.${
    type === 'midi' ? 'mid' : 'json'
  }?timezoneOffset=${timezoneOffset}`
}

export function useLoadChallenge(url: string): {
  challenge: Challenge | null
  loadingChallenge: boolean
} {
  const [loadingChallenge, setLoadingChallenge] = useState(true)
  const [challenge, setChallenge] = useState<Challenge | null>(null)
  const navigate = useNavigate()

  const loadChallenge = useCallback(async () => {
    try {
      const response = await axios.get<Challenge>(url)
      setChallenge(response.data)
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        navigate('/not-found', { replace: true })
      } else {
        console.error(getErrorMessage(error))
      }
    } finally {
      setLoadingChallenge(false)
    }
  }, [url, navigate])

  useEffect(() => {
    loadChallenge()
  }, [loadChallenge])

  return { challenge, loadingChallenge }
}
