import { ScientificNoteName } from 'components/Game/types'
import styled, { css } from 'styled-components'
import { Octave } from 'components/Game/types'

type OctaveGroupProps = {
  octave: Octave
  addNote: (note: ScientificNoteName) => void
  disabled: boolean
}
export function OctaveGroup({
  octave,
  addNote,
  disabled,
}: OctaveGroupProps): JSX.Element {
  return (
    <>
      <WhiteKey
        id="keyC"
        onClick={() => addNote(`C${octave}`)}
        type="button"
        disabled={disabled}
      >
        C
      </WhiteKey>
      <BlackKey
        id="keyC#"
        onClick={() => addNote(`C#${octave}`)}
        type="button"
        disabled={disabled}
      >
        C#
      </BlackKey>
      <WhiteKey
        id="keyD"
        onClick={() => addNote(`D${octave}`)}
        type="button"
        disabled={disabled}
        $offset
      >
        D
      </WhiteKey>
      <BlackKey
        id="keyD#"
        onClick={() => addNote(`D#${octave}`)}
        type="button"
        disabled={disabled}
      >
        D#
      </BlackKey>
      <WhiteKey
        id="keyE"
        onClick={() => addNote(`E${octave}`)}
        type="button"
        disabled={disabled}
        $offset
      >
        E
      </WhiteKey>
      <WhiteKey
        id="keyF"
        onClick={() => addNote(`F${octave}`)}
        type="button"
        disabled={disabled}
      >
        F
      </WhiteKey>
      <BlackKey
        id="keyF#"
        onClick={() => addNote(`F#${octave}`)}
        type="button"
        disabled={disabled}
      >
        F#
      </BlackKey>
      <WhiteKey
        id="keyG"
        onClick={() => addNote(`G${octave}`)}
        type="button"
        disabled={disabled}
        $offset
      >
        G
      </WhiteKey>
      <BlackKey
        id="keyG#"
        onClick={() => addNote(`G#${octave}`)}
        type="button"
        disabled={disabled}
      >
        G#
      </BlackKey>
      <WhiteKey
        id="keyA"
        onClick={() => addNote(`A${octave}`)}
        type="button"
        disabled={disabled}
        $offset
      >
        A
      </WhiteKey>
      <BlackKey
        id="keyA#"
        onClick={() => addNote(`A#${octave}`)}
        type="button"
        disabled={disabled}
      >
        A#
      </BlackKey>
      <WhiteKey
        id="keyB"
        onClick={() => addNote(`B${octave}`)}
        type="button"
        disabled={disabled}
        $offset
      >
        B
      </WhiteKey>
    </>
  )
}

export const Key = styled.button`
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
