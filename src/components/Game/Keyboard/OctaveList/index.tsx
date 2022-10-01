import { useCallback, useContext, useMemo } from 'react'
import { NoteName, Octave } from 'components/Game/types'
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
    (note: NoteName) => {
      playNote(note)

      if (currentAttempt.length < melody.length) {
        setAttempts((state) => {
          const updatedAttempts = [...state]
          const updatedAttempt = [...currentAttempt]
          updatedAttempt.push({ name: note })

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

      if (amendedOctaves[0] > 0) {
        amendedOctaves.unshift(amendedOctaves[0] - 1)
      }

      if (amendedOctaves[amendedOctaves.length - 1] < 8) {
        amendedOctaves.push(amendedOctaves[amendedOctaves.length - 1] + 1)
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
