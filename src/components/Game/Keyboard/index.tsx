import { theme } from 'common/theme'
import { GameContext } from 'components/Game/context'
import {
  ComputerKey,
  computerKeys,
  keyUp,
  clickButton,
} from 'components/Game/Keyboard/utils'
import { Note, NoteValue } from 'components/Game/types'
import { useContext, useEffect, useCallback, useState } from 'react'
import styled, { css } from 'styled-components'
import { FiCornerDownLeft, FiDelete, FiEye, FiEyeOff } from 'react-icons/fi'

export function Keyboard(): JSX.Element {
  const [usingKeyboard, setUsingKeyboard] = useState(false)

  const {
    currentAttemptIndex,
    setCurrentAttemptIndex,
    attempts,
    setAttempts,
    melodyLength,
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
    // Filled the row with notes
    if (currentAttempt.length === melodyLength) {
      // Validation function will be called from here
      const updatedAttempt = [...currentAttempt].map(
        (note) =>
          ({
            ...note,
            hint: 0,
          } as Note)
      )

      setAttempts((state) => {
        const updatedAttempts = [...state]

        updatedAttempts[currentAttemptIndex] = updatedAttempt

        return updatedAttempts
      })

      if (updatedAttempt.every((note) => note.hint === 2)) {
        endGame('success')
        return
      }

      if (currentAttemptIndex < attempts.length - 1) {
        setCurrentAttemptIndex((index) => index + 1)
      } else {
        endGame('fail')
      }
    }
  }, [
    attempts.length,
    currentAttempt,
    currentAttemptIndex,
    melodyLength,
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

      if (event.key === 'Enter' && !event.repeat) {
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
    if (currentAttempt.length < melodyLength) {
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
    <Container>
      <Buttons>
        <Button
          id="keyToggleKeyboard"
          onClick={() => setUsingKeyboard((state) => !state)}
          title={usingKeyboard ? 'hide key map' : 'show key map'}
          type="button"
        >
          {usingKeyboard ? (
            <FiEye size={48} color="black" />
          ) : (
            <FiEyeOff size={48} color="black" />
          )}
        </Button>
      </Buttons>
      <Keys>
        <WhiteKey
          id="keyC"
          onClick={() => addNote('C')}
          type="button"
          disabled={gameIsOver}
        >
          {usingKeyboard ? 'A' : 'C'}
        </WhiteKey>
        <BlackKey
          id="keyC#"
          onClick={() => addNote('C#')}
          type="button"
          disabled={gameIsOver}
        >
          {usingKeyboard ? 'W' : 'C#'}
        </BlackKey>
        <WhiteKey
          id="keyD"
          onClick={() => addNote('D')}
          type="button"
          disabled={gameIsOver}
          $offset
        >
          {usingKeyboard ? 'S' : 'D'}
        </WhiteKey>
        <BlackKey
          id="keyD#"
          onClick={() => addNote('D#')}
          type="button"
          disabled={gameIsOver}
        >
          {usingKeyboard ? 'E' : 'D#'}
        </BlackKey>
        <WhiteKey
          id="keyE"
          onClick={() => addNote('E')}
          type="button"
          disabled={gameIsOver}
          $offset
        >
          {usingKeyboard ? 'D' : 'E'}
        </WhiteKey>
        <WhiteKey
          id="keyF"
          onClick={() => addNote('F')}
          type="button"
          disabled={gameIsOver}
        >
          F
        </WhiteKey>
        <BlackKey
          id="keyF#"
          onClick={() => addNote('F#')}
          type="button"
          disabled={gameIsOver}
        >
          {usingKeyboard ? 'T' : 'F#'}
        </BlackKey>
        <WhiteKey
          id="keyG"
          onClick={() => addNote('G')}
          type="button"
          disabled={gameIsOver}
          $offset
        >
          G
        </WhiteKey>
        <BlackKey
          id="keyG#"
          onClick={() => addNote('G#')}
          type="button"
          disabled={gameIsOver}
        >
          {usingKeyboard ? 'Y' : 'G#'}
        </BlackKey>
        <WhiteKey
          id="keyA"
          onClick={() => addNote('A')}
          type="button"
          disabled={gameIsOver}
          $offset
        >
          {usingKeyboard ? 'H' : 'A'}
        </WhiteKey>
        <BlackKey
          id="keyA#"
          onClick={() => addNote('A#')}
          type="button"
          disabled={gameIsOver}
        >
          {usingKeyboard ? 'U' : 'A#'}
        </BlackKey>
        <WhiteKey
          id="keyB"
          onClick={() => addNote('B')}
          type="button"
          disabled={gameIsOver}
          $offset
        >
          {usingKeyboard ? 'J' : 'B'}
        </WhiteKey>
      </Keys>
      <Buttons>
        <Button
          id="keyBackspace"
          onClick={removeLastNote}
          type="button"
          title="backspace"
          disabled={gameIsOver}
        >
          <FiDelete size={48} color="black" />
        </Button>
        <Button
          id="keyEnter"
          onClick={attemptChallenge}
          type="submit"
          title="submit"
          disabled={gameIsOver}
        >
          <FiCornerDownLeft size={48} color="black" />
        </Button>
      </Buttons>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
`

const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const Button = styled.button`
  border: 0;
  background-color: ${theme.color.secondary.background};
  height: fit-content;
  width: fit-content;
  padding: 4px;
  margin: 0;
  display: inline-flex;
  :not(:disabled) {
    cursor: pointer;
  }

  &:hover:not(:disabled) {
    filter: brightness(1.2);
  }

  &.active:not(:disabled),
  &:active:not(:disabled) {
    filter: brightness(1.4);
  }
`

const Key = styled.button`
  position: relative;
  float: left;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  padding: 0.5rem 0;
  user-select: none;

  :not(:disabled) {
    cursor: pointer;
  }
`

type WhiteKeyProps = {
  $offset?: boolean
}
const WhiteKey = styled(Key)<WhiteKeyProps>`
  height: 12.5rem;
  width: 2.5rem;
  border-left: 1px solid hsl(0, 0%, 73%);
  border-bottom: 1px solid hsl(0, 0%, 73%);
  border-radius: 0 0 5px 5px;
  box-shadow: -1px 0 0 var(--white-80) inset, 0 0 5px hsl(0, 0%, 80%) inset,
    0 0 3px var(--black-20);
  background: linear-gradient(to bottom, hsl(0, 0%, 93%) 0%, white 100%);
  color: var(--black-30);

  &.active:not(:disabled),
  &:active:not(:disabled) {
    border-top: 1px solid hsl(0, 0%, 47%);
    border-left: 1px solid hsl(0, 0%, 60%);
    border-bottom: 1px solid hsl(0, 0%, 60%);
    box-shadow: 2px 0 3px var(--black-10) inset,
      -5px 5px 20px var(--black-20) inset, 0 0 3px var(--black-20);
    background: linear-gradient(to bottom, white 0%, hsl(0, 0%, 91%) 100%);
    outline: none;
  }

  ${({ $offset }) =>
    $offset &&
    css`
      margin: 0 0 0 -1rem;
    `}
`

const BlackKey = styled(Key)`
  height: 8rem;
  width: 2rem;
  margin: 0 0 0 -1rem;
  z-index: 1;
  border: 1px solid black;
  border-radius: 0 0 3px 3px;
  box-shadow: -1px -1px 2px var(--white-20) inset,
    0 -5px 2px 3px var(--black-60) inset, 0 2px 4px var(--black-50);
  background: linear-gradient(45deg, hsl(0, 0%, 13%) 0%, hsl(0, 0%, 33%) 100%);
  color: var(--white-50);

  &.active:not(:disabled),
  &:active:not(:disabled) {
    box-shadow: -1px -1px 2px var(--white-20) inset,
      0 -2px 2px 3px var(--black-60) inset, 0 1px 2px var(--black-50);
    background: linear-gradient(
      to right,
      hsl(0, 0%, 27%) 0%,
      hsl(0, 0%, 13%) 100%
    );
    outline: none;
  }
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
