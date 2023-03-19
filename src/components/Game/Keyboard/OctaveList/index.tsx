import { useCallback, useContext, useMemo } from 'react'
import { ScientificNoteName, Octave } from 'components/Game/types'
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
    let calculatedOctaves: number[] = []

    for (let index = 0; index < melody.length; index++) {
      const octave = parseInt(melody[index].replace(/\D/, ''))

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
        extendedOctaves.unshift(extendedOctaves[0] - 1)
      }

      if (extendedOctaves[extendedOctaves.length - 1] < 8) {
        extendedOctaves.push(extendedOctaves[extendedOctaves.length - 1] + 1)
      }

      calculatedOctaves = extendedOctaves
    }

    return calculatedOctaves
  }, [melody])

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
}
