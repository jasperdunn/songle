import { theme } from 'common/theme'
import { RowGrid } from 'components/Game/Board/Row'
import { Tile } from 'components/Game/Board/Row/Tile'
import { Modal } from 'components/Modal'
import { FiCircle, FiDelete, FiPlay } from 'react-icons/fi'
import styled from 'styled-components'

type OnboardingModalProps = {
  onBoarded: boolean
  setOnBoarded: (onBoarded: boolean) => void
  numberOfPossibleAttempts: number
}
export function OnboardingModal({
  onBoarded,
  setOnBoarded,
  numberOfPossibleAttempts,
}: OnboardingModalProps): JSX.Element {
  return (
    <Modal
      isOpen={!onBoarded}
      onHide={() => {
        setOnBoarded(true)
      }}
    >
      <h1>How to play</h1>
      <small>
        Please wear headphones to prevent spoiling the challenge for other
        players.
      </small>
      <p>Guess the melody in {numberOfPossibleAttempts} tries.</p>
      <p>
        First, press play{' '}
        <FiPlay
          style={{ verticalAlign: 'text-bottom' }}
          color="black"
          title="play"
        />{' '}
        to hear the rhythm of a popular tune.
      </p>
      <p>Press the notes on the keyboard in the right order.</p>
      <p>
        After each attempt, the color of the tiles will change to show how close
        your guess was.
      </p>
      <hr />
      <h2>Controls</h2>
      <p>
        Press backspace{' '}
        <FiDelete
          style={{ verticalAlign: 'text-bottom' }}
          color="black"
          title="backspace"
        />{' '}
        to remove notes.
      </p>
      <p>
        Press record{' '}
        <FiCircle
          style={{ verticalAlign: 'text-bottom' }}
          color="black"
          title="record"
        />{' '}
        to make an attempt.
      </p>
      <p>
        Press play{' '}
        <FiPlay
          style={{ verticalAlign: 'text-bottom' }}
          color="black"
          title="play"
        />{' '}
        to hear your previously recorded attempt.
      </p>
      <hr />
      <h2>Examples</h2>
      <SmallRowGrid melodyLength={6}>
        <Tile hint={2}>C2</Tile>
        <Tile>D2</Tile>
        <Tile>E3</Tile>
        <Tile>F3</Tile>
        <Tile>G4</Tile>
        <Tile>A4</Tile>
      </SmallRowGrid>
      <p>
        The note <strong>C2</strong> is in the melody and in the correct spot.
      </p>
      <br />
      <SmallRowGrid melodyLength={6}>
        <Tile>C2</Tile>
        <Tile hint={1}>D2</Tile>
        <Tile>E3</Tile>
        <Tile>F3</Tile>
        <Tile>G4</Tile>
        <Tile>A4</Tile>
      </SmallRowGrid>
      <p>
        The note <strong>D2</strong> is in the melody but in the wrong spot.
      </p>
      <br />
      <SmallRowGrid melodyLength={6}>
        <Tile>C2</Tile>
        <Tile>D2</Tile>
        <Tile>E3</Tile>
        <Tile hint={0}>F3</Tile>
        <Tile>G4</Tile>
        <Tile>A4</Tile>
      </SmallRowGrid>
      <p>
        The note <strong>F3</strong> is not in the melody.
      </p>
      <hr />
      <p>
        A new <strong>songle</strong> will be available each day!
      </p>
    </Modal>
  )
}

const SmallRowGrid = styled(RowGrid)`
  width: 100%;

  @media ${theme.breakpointUp.tablet} {
    width: 320px;
  }
`
