import { GameContext } from 'components/Game/context'
import {
  ComputerKey,
  computerKeys,
  keyUp,
  clickButton,
} from 'components/Game/Keyboard/utils'
import { useContext, useEffect, useCallback, useState } from 'react'
import styled from 'styled-components'
import { FiCircle, FiDelete, FiPlay, FiSquare } from 'react-icons/fi'
import { validate } from 'components/Game/utils'
import { Button } from 'components/Button'
import { KeyBase } from 'components/Game/Keyboard/OctaveList/OctaveGroup'
import { OctaveList } from 'components/Game/Keyboard/OctaveList'
import { clone } from 'common/utils'
import { usePreviousValue } from 'hooks/usePreviousValue'

type KeyboardProps = {
  play: () => void
  stop: () => void
  playing: boolean
}
export function Keyboard({ play, stop, playing }: KeyboardProps): JSX.Element {
  const {
    currentAttemptIndex,
    setGame,
    attempts,
    melody,
    endGame,
    gameOverResult,
  } = useContext(GameContext)
  const gameIsOver = gameOverResult !== null
  const currentAttempt = attempts[currentAttemptIndex]
  const [won, setWon] = useState(false)
  const prevPlaying = usePreviousValue(playing)

  useEffect(() => {
    if (!gameIsOver && won && prevPlaying && !playing) {
      endGame('won')
    }
  }, [won, playing, endGame, gameIsOver, prevPlaying])

  const removeLastNote = useCallback(() => {
    setGame((state) => {
      const updatedGame = clone(state)
      const updatedAttempts = [...updatedGame.attempts]
      const updatedAttempt = [...currentAttempt]
      updatedAttempt.pop()

      updatedAttempts[currentAttemptIndex] = updatedAttempt
      updatedGame.attempts = updatedAttempts

      return updatedGame
    })
  }, [currentAttempt, currentAttemptIndex, setGame])

  const attemptChallenge = useCallback(() => {
    if (currentAttempt.length === melody.length) {
      const updatedAttempt = validate(currentAttempt, melody)

      setGame((state) => {
        const updatedGame = clone(state)
        const updatedAttempts = [...updatedGame.attempts]

        updatedAttempts[currentAttemptIndex] = updatedAttempt
        updatedGame.attempts = updatedAttempts

        return updatedGame
      })

      if (updatedAttempt.every((note) => note.hint === 2)) {
        play()
        setWon(true)
        return
      }

      if (currentAttemptIndex < attempts.length - 1) {
        setGame((game) => {
          const updatedGame = { ...game }
          updatedGame.currentAttemptIndex = game.currentAttemptIndex + 1
          return updatedGame
        })
      } else {
        endGame('lost')
      }
    }
  }, [
    attempts.length,
    currentAttempt,
    currentAttemptIndex,
    melody,
    setGame,
    endGame,
    play,
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

  return (
    <>
      <Buttons>
        <Button
          id="keyBackspace"
          variant="secondary"
          onClick={removeLastNote}
          type="button"
          title="Remove the last note"
          disabled={gameIsOver || playing || currentAttempt.length === 0}
        >
          <FiDelete size={48} color="black" />
        </Button>
        {playing ? (
          <Button
            id="keySpace"
            variant="secondary"
            onClick={stop}
            type="button"
            title="Stop"
          >
            <FiSquare size={48} color="black" />
          </Button>
        ) : (
          <Button
            id="keySpace"
            variant="secondary"
            onClick={play}
            type="button"
            title="Play"
          >
            <FiPlay size={48} color="black" />
          </Button>
        )}
        <Button
          id="keyEnter"
          variant="secondary"
          onClick={attemptChallenge}
          type="submit"
          title="Record"
          disabled={gameIsOver || playing}
        >
          <FiCircle size={48} color="black" />
        </Button>
      </Buttons>
      <Container>
        <ScrollHelper>
          <Keys>
            <OctaveList />
          </Keys>
        </ScrollHelper>
      </Container>
    </>
  )
}

const Container = styled.div`
  display: flex;
  width: 100vw;
  overflow-x: auto;
  padding: 0 16px;
  justify-content: center;
`

/**
 * Horizontal scrolling was getting cut off on smaller screens.
 */
const ScrollHelper = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
  width: 100%;
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
  height: 204px;
  display: flex;
  // occupy the second column
  grid-column: 2;

  ${KeyBase}:first-child {
    border-radius: 5px 0 5px 5px;
  }

  ${KeyBase}:last-child {
    border-radius: 0 5px 5px 5px;
  }

  border-bottom: 4px solid black;
  border-radius: 5px;
`
