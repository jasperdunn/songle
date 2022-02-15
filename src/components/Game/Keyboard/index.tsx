import { theme } from 'common/theme'
import { GameContext } from 'components/Game/context'
import { Note } from 'components/Game/types'
import { useContext, useEffect } from 'react'
import styled, { css } from 'styled-components'

export function Keyboard(): JSX.Element {
  const {
    currentAttemptIndex,
    setCurrentAttemptIndex,
    attempts,
    setAttempts,
    melodyLength,
    numberOfPossibleAttempts,
  } = useContext(GameContext)

  const currentAttempt = attempts[currentAttemptIndex]

  useEffect(() => {
    function removeLastNote(): void {
      setAttempts((state) => {
        const updatedAttempts = [...state]
        const updatedAttempt = [...currentAttempt]
        updatedAttempt.pop()

        updatedAttempts[currentAttemptIndex] = updatedAttempt

        return updatedAttempts
      })
    }

    function attemptChallenge(): void {
      if (
        currentAttempt.length === melodyLength &&
        currentAttemptIndex < numberOfPossibleAttempts - 1
      ) {
        setCurrentAttemptIndex((index) => index + 1)
      }
    }

    function keyDown(this: Document, event: KeyboardEvent): void {
      if (event.key === 'Backspace' && currentAttempt.length > 0) {
        event.preventDefault()

        removeLastNote()
      } else if (event.key === 'Enter') {
        event.preventDefault()

        attemptChallenge()
      }
    }

    document.addEventListener('keydown', keyDown)

    return () => {
      document.removeEventListener('keydown', keyDown)
    }
  }, [
    currentAttempt,
    currentAttemptIndex,
    setAttempts,
    melodyLength,
    numberOfPossibleAttempts,
    setCurrentAttemptIndex,
  ])

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
      <WhiteKey onClick={() => addNote('C')}>C</WhiteKey>
      <BlackKey onClick={() => addNote('C#')}>C#</BlackKey>
      <WhiteKey onClick={() => addNote('D')} $offset>
        D
      </WhiteKey>
      <BlackKey onClick={() => addNote('D#')}>D#</BlackKey>
      <WhiteKey onClick={() => addNote('E')} $offset>
        E
      </WhiteKey>
      <WhiteKey onClick={() => addNote('F')}>F</WhiteKey>
      <BlackKey onClick={() => addNote('F#')}>F#</BlackKey>
      <WhiteKey onClick={() => addNote('G')} $offset>
        G
      </WhiteKey>
      <BlackKey onClick={() => addNote('G#')}>G#</BlackKey>
      <WhiteKey onClick={() => addNote('A')} $offset>
        A
      </WhiteKey>
      <BlackKey onClick={() => addNote('A#')}>A#</BlackKey>
      <WhiteKey onClick={() => addNote('B')} $offset>
        B
      </WhiteKey>
    </Container>
  )
}

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

  :active {
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

  :active {
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

const Container = styled.div`
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
  padding: 10px;
  padding-top: 0;
  display: flex;
  justify-content: center;

  ${Key}:first-child {
    border-radius: 5px 0 5px 5px;
  }

  ${Key}:last-child {
    border-radius: 0 5px 5px 5px;
  }

  @media ${theme.breakpointUp.mobileLandscape} {
    width: 500px;
  }
`
