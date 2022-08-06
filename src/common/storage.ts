import { Attempt, GameOverResult } from 'components/Game/types'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'

type LocalStorage = {
  attempts: Attempt[]
  currentAttemptIndex: number
  gameOverResult: GameOverResult | null
  onBoarded: boolean
}

export function getLocalStorage<K extends keyof LocalStorage>(
  key: K
): LocalStorage[K] | null {
  const attemptsString = localStorage.getItem(key)
  if (attemptsString) {
    return JSON.parse(attemptsString)
  }

  return null
}

export function setLocalStorage<K extends keyof LocalStorage>(
  key: K,
  value: LocalStorage[K]
): void {
  localStorage.setItem(key, JSON.stringify(value))
}

export function useLocalStorage<K extends keyof LocalStorage>(
  key: K,
  defaultValue: LocalStorage[K]
): [LocalStorage[K], Dispatch<SetStateAction<LocalStorage[K]>>] {
  const [value, setValue] = useState(() => getLocalStorage(key) || defaultValue)

  useEffect(() => {
    setLocalStorage(key, value)
  }, [key, value])

  return [value, setValue]
}
