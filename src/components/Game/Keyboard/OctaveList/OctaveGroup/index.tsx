import {
  AttemptedNote,
  ScientificNoteName,
  NoteName,
} from 'components/Game/types'
import styled, { css } from 'styled-components'
import { Octave } from 'components/Game/types'
import { theme } from 'common/theme'

type OctaveGroupProps = {
  octave: Octave
  addNote: (note: ScientificNoteName) => void
  disabled: boolean
  attemptedNotes: AttemptedNote[]
}
export function OctaveGroup({
  octave,
  addNote,
  disabled,
  attemptedNotes,
}: OctaveGroupProps): JSX.Element {
  const keys: Key[] = [
    { type: 'white', note: 'C' },
    { type: 'black', note: 'C#' },
    { type: 'white', note: 'D', offset: true },
    { type: 'black', note: 'D#' },
    { type: 'white', note: 'E', offset: true },
    { type: 'white', note: 'F' },
    { type: 'black', note: 'F#' },
    { type: 'white', note: 'G', offset: true },
    { type: 'black', note: 'G#' },
    { type: 'white', note: 'A', offset: true },
    { type: 'black', note: 'A#' },
    { type: 'white', note: 'B', offset: true },
  ]

  return (
    <>
      {keys.map(({ type, note, offset = false }) => {
        const scientificNoteName: ScientificNoteName = `${note}${octave}`
        const id: KeyId = `key${scientificNoteName}`
        const hint = attemptedNotes.find(
          (n) => n.name === scientificNoteName
        )?.hint
        const disabledKey = disabled || hint === 0

        return type === 'white' ? (
          <WhiteKey
            key={id}
            id={id}
            onClick={() => addNote(scientificNoteName)}
            type="button"
            disabled={disabledKey}
            $offset={offset}
            $hint={hint}
          >
            {disabledKey ? null : note}
          </WhiteKey>
        ) : (
          <BlackKey
            key={id}
            id={id}
            onClick={() => addNote(scientificNoteName)}
            type="button"
            disabled={disabledKey}
            $hint={hint}
          >
            {disabledKey ? null : note}
          </BlackKey>
        )
      })}
    </>
  )
}

type KeyBaseProps = {
  id: `key${ScientificNoteName}`
  $hint?: number
}
export const KeyBase = styled.button<KeyBaseProps>`
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
const WhiteKey = styled(KeyBase)<WhiteKeyProps>`
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

  ${({ $hint }) => {
    switch ($hint) {
      case 0:
        return css`
          background-color: ${theme.color.primary.background};
          filter: brightness(0.5);
        `

      case 1:
        return css`
          background: linear-gradient(
            to bottom,
            hsl(0, 0%, 91%) 0%,
            rgb(74, 74, 255) 100%
          );
          color: var(--black-60);
        `

      case 2:
        return css`
          background: linear-gradient(
            to bottom,
            hsl(0, 0%, 91%) 0%,
            #ff8c00 100%
          );
          color: var(--black-60);
        `

      default:
        return
    }
  }}
`

const BlackKey = styled(KeyBase)`
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

  ${({ $hint }) => {
    switch ($hint) {
      case 0:
        return css`
          background-color: ${theme.color.primary.background};
          filter: brightness(0.5);
        `

      case 1:
        return css`
          background: linear-gradient(
            to bottom,
            hsl(0, 0%, 91%) 0%,
            rgb(74, 74, 255) 100%
          );
          color: var(--black-60);
        `

      case 2:
        return css`
          background: linear-gradient(
            to bottom,
            hsl(0, 0%, 91%) 0%,
            #ff8c00 100%
          );
          color: var(--black-60);
        `

      default:
        return
    }
  }}
`

type Key = {
  type: 'white' | 'black'
  note: NoteName
  offset?: boolean
}

type KeyId = `key${ScientificNoteName}`
