import { NoteValue, NoteHint } from 'components/Game/types'

export function validate(
  attemptedSequence: NoteValue[],
  challengeSequence: NoteValue[]
): NoteHint[] {
  const noteHints: NoteHint[] = []

  for (let i = 0; i < attemptedSequence.length; i++) {
    const note = attemptedSequence[i]
    let noteHint: NoteHint = 0

    if (challengeSequence.includes(note)) {
      if (note === challengeSequence[i]) {
        noteHint = 2
      } else {
        noteHint = 1
      }
    }

    noteHints.push(noteHint)
  }

  return noteHints
}
