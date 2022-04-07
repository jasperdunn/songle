import { Attempt } from 'components/Game/types'

type LocalStorage = {
  attempts: Attempt[]
  currentAttemptIndex: number
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
