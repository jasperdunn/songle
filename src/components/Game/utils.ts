import { Attempt, Note, NoteValue } from 'components/Game/types'

export function validate(
  attemptedSequence: Note[],
  challengeSequence: NoteValue[]
): Note[] {
  const validatedNotes: Note[] = []

  for (let i = 0; i < attemptedSequence.length; i++) {
    const note = attemptedSequence[i]

    if (challengeSequence.includes(note.value)) {
      if (note.value === challengeSequence[i]) {
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
