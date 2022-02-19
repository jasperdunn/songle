import { theme } from 'common/theme'
import { GameContext } from 'components/Game/context'
import {
  ComputerKey,
  computerKeys,
  keyUp,
  clickButton,
} from 'components/Game/Keyboard/utils'
import { Note } from 'components/Game/types'
import { useContext, useEffect, useCallback } from 'react'
import styled, { css } from 'styled-components'
import { FiCornerDownLeft, FiDelete } from 'react-icons/fi'

export function Keyboard(): JSX.Element {
  const useKeyboard = true

  const {
    currentAttemptIndex,
    setCurrentAttemptIndex,
    attempts,
    setAttempts,
    melodyLength,
    numberOfPossibleAttempts,
  } = useContext(GameContext)

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
    if (
      currentAttempt.length === melodyLength &&
      currentAttemptIndex < numberOfPossibleAttempts - 1
    ) {
      setCurrentAttemptIndex((index) => index + 1)
    }
  }, [
    currentAttempt.length,
    currentAttemptIndex,
    melodyLength,
    numberOfPossibleAttempts,
    setCurrentAttemptIndex,
  ])

  useEffect(() => {
    function keyDown(this: Document, event: KeyboardEvent): void {
      if (event.key === 'Backspace' && currentAttempt.length > 0) {
        event.preventDefault()
        clickButton(event.key as ComputerKey)
        return
      }

      if (event.key === 'Enter' && !event.repeat) {
        event.preventDefault()
        clickButton(event.key as ComputerKey)
        return
      }

      if (computerKeys.includes(event.key as ComputerKey) && !event.repeat) {
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

  function addNote(note: Note): void {
    if (currentAttempt.length < melodyLength) {
      setAttempts((state) => {
        const updatedAttempts = [...state]
        const updatedAttempt = [...currentAttempt]
        updatedAttempt.push(note)

        updatedAttempts[currentAttemptIndex] = updatedAttempt

        return updatedAttempts
      })
    }
  }

  return (
    <Container>
      <Keys>
        <WhiteKey id="keyC" onClick={() => addNote('C')}>
          {useKeyboard ? 'A' : 'C'}
        </WhiteKey>
        <BlackKey id="keyC#" onClick={() => addNote('C#')}>
          {useKeyboard ? 'W' : 'C#'}
        </BlackKey>
        <WhiteKey id="keyD" onClick={() => addNote('D')} $offset>
          {useKeyboard ? 'S' : 'D'}
        </WhiteKey>
        <BlackKey id="keyD#" onClick={() => addNote('D#')}>
          {useKeyboard ? 'E' : 'D#'}
        </BlackKey>
        <WhiteKey id="keyE" onClick={() => addNote('E')} $offset>
          {useKeyboard ? 'D' : 'E'}
        </WhiteKey>
        <WhiteKey id="keyF" onClick={() => addNote('F')}>
          F
        </WhiteKey>
        <BlackKey id="keyF#" onClick={() => addNote('F#')}>
          {useKeyboard ? 'T' : 'F#'}
        </BlackKey>
        <WhiteKey id="keyG" onClick={() => addNote('G')} $offset>
          G
        </WhiteKey>
        <BlackKey id="keyG#" onClick={() => addNote('G#')}>
          {useKeyboard ? 'Y' : 'G#'}
        </BlackKey>
        <WhiteKey id="keyA" onClick={() => addNote('A')} $offset>
          {useKeyboard ? 'H' : 'A'}
        </WhiteKey>
        <BlackKey id="keyA#" onClick={() => addNote('A#')}>
          {useKeyboard ? 'U' : 'A#'}
        </BlackKey>
        <WhiteKey id="keyB" onClick={() => addNote('B')} $offset>
          {useKeyboard ? 'J' : 'B'}
        </WhiteKey>
      </Keys>
      <Buttons>
        <Button id="keyBackspace" onClick={removeLastNote}>
          <FiDelete size={48} color="black" title="backspace" />
        </Button>
        <Button id="keyEnter" onClick={attemptChallenge}>
          <FiCornerDownLeft size={48} color="black" title="submit" />
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

  &:hover {
    cursor: pointer;
    filter: brightness(1.2);
  }

  &.active,
  &:active {
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
  cursor: pointer;
`

type WhiteKeyProps = {
  $offset?: boolean
}
const WhiteKey = styled(Key)<WhiteKeyProps>`
  height: 12.5rem;
  width: 2.5rem;
  z-index: 1;
  border-left: 1px solid hsl(0, 0%, 73%);
  border-bottom: 1px solid hsl(0, 0%, 73%);
  border-radius: 0 0 5px 5px;
  box-shadow: -1px 0 0 var(--white-80) inset, 0 0 5px hsl(0, 0%, 80%) inset,
    0 0 3px var(--black-20);
  background: linear-gradient(to bottom, hsl(0, 0%, 93%) 0%, white 100%);
  color: var(--black-30);

  &.active,
  &:active {
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
  z-index: 2;
  border: 1px solid black;
  border-radius: 0 0 3px 3px;
  box-shadow: -1px -1px 2px var(--white-20) inset,
    0 -5px 2px 3px var(--black-60) inset, 0 2px 4px var(--black-50);
  background: linear-gradient(45deg, hsl(0, 0%, 13%) 0%, hsl(0, 0%, 33%) 100%);
  color: var(--white-50);

  &.active,
  &:active {
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
