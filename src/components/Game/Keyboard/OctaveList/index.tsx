import { useCallback, useContext, useMemo } from 'react'
import { NoteValue, Octave } from 'components/Game/types'
import { OctaveGroup } from 'components/Game/Keyboard/OctaveList/OctaveGroup'
import { GameContext } from 'components/Game/context'

export function OctaveList(): JSX.Element {
  const {
    attempts,
    currentAttemptIndex,
    setAttempts,
    melody,
    gameOverResult,
    playNote,
  } = useContext(GameContext)

  const currentAttempt = attempts[currentAttemptIndex]

  const addNote = useCallback(
    (note: NoteValue) => {
      playNote(note)

      if (currentAttempt.length < melody.length) {
        setAttempts((state) => {
          const updatedAttempts = [...state]
          const updatedAttempt = [...currentAttempt]
          updatedAttempt.push({ value: note })

          updatedAttempts[currentAttemptIndex] = updatedAttempt

          return updatedAttempts
        })
      }
    },
    [currentAttempt, currentAttemptIndex, melody.length, playNote, setAttempts]
  )

  return useMemo(() => {
    let octaves: number[] = []

    for (let index = 0; index < melody.length; index++) {
      const octave = parseInt(melody[index].replace(/\D/, ''))

      if (
        !isNaN(octave) &&
        octave >= 0 &&
        octave <= 8 &&
        !octaves.includes(octave)
      ) {
        octaves.push(octave)
      }
    }

    octaves.sort()

    if (octaves.length < 3) {
      const amendedOctaves = [...octaves]

      for (let index = 0; index < octaves.length; index++) {
        const octave = octaves[index]

        if (octave > 0) {
          amendedOctaves.unshift(octave - 1)
        }

        if (octave < 8) {
          amendedOctaves.push(octave + 1)
        }
      }

      octaves = amendedOctaves
    }

    return (
      <>
        {octaves.map((octave) => (
          <OctaveGroup
            key={octave}
            octave={octave as Octave}
            addNote={addNote}
            disabled={!!gameOverResult}
          />
        ))}
      </>
    )
  }, [addNote, gameOverResult, melody])
}
