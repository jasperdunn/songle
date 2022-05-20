import { Attempt, NoteValue } from 'components/Game/types'

export function validate(
  attemptedSequence: Attempt,
  challengeSequence: NoteValue[]
): Attempt {
  const validatedNotes: Attempt = []

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
