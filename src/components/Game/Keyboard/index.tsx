import { GameContext } from 'components/Game/context'
import {
  ComputerKey,
  computerKeys,
  keyUp,
  clickButton,
} from 'components/Game/Keyboard/utils'
import { NoteValue } from 'components/Game/types'
import { useContext, useEffect, useCallback } from 'react'
import styled from 'styled-components'
import { FiCircle, FiPlay, FiSkipBack, FiSquare } from 'react-icons/fi'
import { validate } from 'components/Game/utils'
import { Button } from 'components/Button'
import { Key, Octave } from 'components/Game/Keyboard/Octave'
import { setLocalStorage } from 'common/storage'

type KeyboardProps = {
  play: () => void
  stop: () => void
  loading: boolean
  playing: boolean
}
export function Keyboard({
  play,
  stop,
  loading,
  playing,
}: KeyboardProps): JSX.Element {
  const {
    currentAttemptIndex,
    setCurrentAttemptIndex,
    attempts,
    setAttempts,
    melody,
    endGame,
    gameOverResult,
  } = useContext(GameContext)

  const gameIsOver = gameOverResult !== null
  const currentAttempt = attempts[currentAttemptIndex]

  const removeLastNote = useCallback(() => {
    if (currentAttempt.length === 0) {
      return
    }

    setAttempts((state) => {
      const updatedAttempts = [...state]
      const updatedAttempt = [...currentAttempt]
      updatedAttempt.pop()

      updatedAttempts[currentAttemptIndex] = updatedAttempt

      return updatedAttempts
    })
  }, [currentAttempt, currentAttemptIndex, setAttempts])

  const attemptChallenge = useCallback(() => {
    if (currentAttempt.length === melody.length) {
      const updatedAttempt = validate(currentAttempt, melody)

      setAttempts((state) => {
        const updatedAttempts = [...state]

        updatedAttempts[currentAttemptIndex] = updatedAttempt

        setLocalStorage('attempts', updatedAttempts)
        return updatedAttempts
      })

      if (updatedAttempt.every((note) => note.hint === 2)) {
        endGame('won')
        return
      }

      if (currentAttemptIndex < attempts.length - 1) {
        setCurrentAttemptIndex((index) => index + 1)
      } else {
        endGame('lost')
      }
    }
  }, [
    attempts.length,
    currentAttempt,
    currentAttemptIndex,
    melody,
    setAttempts,
    setCurrentAttemptIndex,
    endGame,
  ])

  useEffect(() => {
    function keyDown(this: Document, event: KeyboardEvent): void {
      if (event.key === 'Backspace') {
        event.preventDefault()
        clickButton(event.key as ComputerKey)
        return
      }

      if ((event.key === 'Enter' || event.key === ' ') && !event.repeat) {
        event.preventDefault()
        clickButton(event.key as ComputerKey)
        return
      }

      if (
        computerKeys.includes(event.key as ComputerKey) &&
        !event.repeat &&
        !event.ctrlKey &&
        !event.altKey &&
        !event.metaKey &&
        !event.shiftKey
      ) {
        event.preventDefault()
        clickButton(event.key as ComputerKey)
      }
    }

    document.addEventListener('keydown', keyDown)
    document.addEventListener('keyup', keyUp)

    return () => {
      document.removeEventListener('keydown', keyDown)
      document.removeEventListener('keyup', keyUp)
    }
  }, [currentAttempt.length])

  function addNote(note: NoteValue): void {
    if (currentAttempt.length < melody.length) {
      setAttempts((state) => {
        const updatedAttempts = [...state]
        const updatedAttempt = [...currentAttempt]
        updatedAttempt.push({ value: note })

        updatedAttempts[currentAttemptIndex] = updatedAttempt

        return updatedAttempts
      })
    }
  }

  return (
    <>
      <Buttons>
        {loading ? (
          <>...loading</>
        ) : (
          <>
            <Button
              id="keyBackspace"
              onClick={removeLastNote}
              type="button"
              title="backspace"
              disabled={gameIsOver}
            >
              <FiSkipBack size={48} color="black" />
            </Button>
            {playing ? (
              <Button id="keySpace" onClick={stop} type="button" title="stop">
                <FiSquare size={48} color="black" />
              </Button>
            ) : (
              <Button id="keySpace" onClick={play} type="button" title="play">
                <FiPlay size={48} color="black" />
              </Button>
            )}
            <Button
              id="keyEnter"
              onClick={attemptChallenge}
              type="submit"
              title="record"
              disabled={gameIsOver}
            >
              <FiCircle size={48} color="black" />
            </Button>
          </>
        )}
      </Buttons>
      <Container>
        <Keys>
          <Octave octave={0} addNote={addNote} disabled={gameIsOver} />
          <Octave octave={1} addNote={addNote} disabled={gameIsOver} />
          <Octave octave={2} addNote={addNote} disabled={gameIsOver} />
          <Octave octave={3} addNote={addNote} disabled={gameIsOver} />
          <Octave octave={4} addNote={addNote} disabled={gameIsOver} />
          <Octave octave={5} addNote={addNote} disabled={gameIsOver} />
          <Octave octave={6} addNote={addNote} disabled={gameIsOver} />
          <Octave octave={7} addNote={addNote} disabled={gameIsOver} />
          <Octave octave={8} addNote={addNote} disabled={gameIsOver} />
        </Keys>
      </Container>
    </>
  )
}

const Container = styled.div`
  display: flex;
  width: 100vw;
  overflow-x: scroll;
  padding: 0 16px;
`

const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
`

const Keys = styled.div`
  --black-10: hsla(0, 0%, 0%, 0.1);
  --black-20: hsla(0, 0%, 0%, 0.2);
  --black-30: hsla(0, 0%, 0%, 0.3);
  --black-50: hsla(0, 0%, 0%, 0.5);
  --black-60: hsla(0, 0%, 0%, 0.6);
  --white-20: hsla(0, 0%, 100%, 0.2);
  --white-50: hsla(0, 0%, 100%, 0.5);
  --white-80: hsla(0, 0%, 100%, 0.8);

  position: relative;
  user-select: none;
  height: 200px;
  display: flex;
  justify-content: center;

  ${Key}:first-child {
    border-radius: 5px 0 5px 5px;
  }

  ${Key}:last-child {
    border-radius: 0 5px 5px 5px;
  }
`
