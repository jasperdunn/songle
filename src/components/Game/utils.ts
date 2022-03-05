import { NoteValue, NoteHint } from 'components/Game/types'

export function validate(
  attemptedSequence: NoteValue[],
  challengeSequence: NoteValue[]
): NoteHint[] {
  const noteHints: NoteHint[] = []

  for (let i = 0; i < attemptedSequence.length; i++) {
    const note = attemptedSequence[i]
    let noteHint: NoteHint = 0

    if (note === challengeSequence[i]) {
      noteHint = 1
    } else {
      for (let j = i++; j < challengeSequence.length; j++) {
        if (note === challengeSequence[j]) {
          noteHint = 2
        }
      }
    }

    noteHints.push(noteHint)
  }

  return noteHints
}
