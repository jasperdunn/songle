import { Note, NoteValue } from 'components/Game/types'

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
