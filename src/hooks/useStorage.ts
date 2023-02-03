import { Game } from 'components/Game/useCurrentGame'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'

type LocalStorage = {
  gameByLevel: Record<string, Game>
  onBoarded: boolean
}

export function getLocalStorage<K extends keyof LocalStorage>(
  key: K
): LocalStorage[K] | null {
  const item = localStorage.getItem(key)
  if (item) {
    return JSON.parse(item)
  }

  return null
}

export function setLocalStorage<K extends keyof LocalStorage>(
  key: K,
  value: LocalStorage[K]
): void {
  localStorage.setItem(key, JSON.stringify(value))
}

export function removeLocalStorage<K extends keyof LocalStorage>(key: K): void {
  localStorage.removeItem(key)
}

export function useLocalStorage<K extends keyof LocalStorage>(
  key: K,
  initialValue: LocalStorage[K]
): [LocalStorage[K], Dispatch<SetStateAction<LocalStorage[K]>>] {
  const [value, setValue] = useState(() => getLocalStorage(key) ?? initialValue)

  useEffect(() => {
    setLocalStorage(key, value)
  }, [key, value])

  return [value, setValue]
}
