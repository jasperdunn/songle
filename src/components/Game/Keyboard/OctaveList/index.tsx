import { useCallback, useContext, useMemo } from 'react'
import {
  ScientificNoteName,
  Octave,
  AttemptedNote,
} from 'components/Game/types'
import { OctaveGroup } from 'components/Game/Keyboard/OctaveList/OctaveGroup'
import { GameContext } from 'components/Game/context'
import { clone } from 'common/utils'

export function OctaveList(): JSX.Element {
  const {
    attempts,
    currentAttemptIndex,
    setGame,
    melody,
    gameOverResult,
    playNote,
  } = useContext(GameContext)

  const currentAttempt = attempts[currentAttemptIndex]

  const addNote = useCallback(
    (note: ScientificNoteName) => {
      playNote(note)

      if (currentAttempt.length < melody.length) {
        setGame((state) => {
          const updatedGame = clone(state)
          const updatedAttempts = [...updatedGame.attempts]
          const updatedAttempt = [...currentAttempt]
          updatedAttempt.push({ name: note })

          updatedAttempts[currentAttemptIndex] = updatedAttempt
          updatedGame.attempts = updatedAttempts

          return updatedGame
        })
      }
    },
    [currentAttempt, currentAttemptIndex, melody.length, playNote, setGame]
  )

  const octaves = useMemo(() => {
    let calculatedOctaves: Octave[] = []

    for (let index = 0; index < melody.length; index++) {
      const octave: Octave = parseInt(melody[index].replace(/\D/, '')) as Octave

      if (
        !isNaN(octave) &&
        octave >= 0 &&
        octave <= 8 &&
        !calculatedOctaves.includes(octave)
      ) {
        calculatedOctaves.push(octave)
      }
    }

    calculatedOctaves.sort()

    if (calculatedOctaves.length < 3) {
      const extendedOctaves = [...calculatedOctaves]

      if (extendedOctaves[0] > 0) {
        extendedOctaves.unshift((extendedOctaves[0] - 1) as Octave)
      }

      if (extendedOctaves[extendedOctaves.length - 1] < 8) {
        extendedOctaves.push(
          (extendedOctaves[extendedOctaves.length - 1] + 1) as Octave
        )
      }

      calculatedOctaves = extendedOctaves
    }

    return calculatedOctaves
  }, [melody])

  const getAttemptedNotesFromOctave = useCallback(
    (octave: Octave) => {
      const attemptedNotes: AttemptedNote[] = []

      for (const attempt of attempts) {
        for (const note of attempt) {
          if (note.name.includes(`${octave}`)) {
            const existingNote = attemptedNotes.find(
              (n) => n.name === note.name
            )

            if (!existingNote) {
              attemptedNotes.push(note)
            } else if ((note.hint || 0) > (existingNote.hint || 0)) {
              attemptedNotes.splice(
                attemptedNotes.indexOf(existingNote),
                1,
                note
              )
            }
          }
        }
      }

      return attemptedNotes
    },
    [attempts]
  )

  const attemptedNotesPerOctave = useMemo(() => {
    const hints: Partial<Record<Octave, AttemptedNote[]>> = {}

    for (let i = 0; i < octaves.length; i++) {
      const octave = octaves[i]

      hints[octave] = getAttemptedNotesFromOctave(octave)
    }

    return hints
  }, [getAttemptedNotesFromOctave, octaves])

  return (
    <>
      {octaves.map((octave) => (
        <OctaveGroup
          key={octave}
          octave={octave as Octave}
          addNote={addNote}
          disabled={!!gameOverResult}
          attemptedNotes={attemptedNotesPerOctave[octave] || []}
        />
      ))}
    </>
  )
}
