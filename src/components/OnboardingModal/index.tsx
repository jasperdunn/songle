import { theme } from 'common/theme'
import { Button } from 'components/Button'
import { RowGrid } from 'components/Game/Board/Row'
import { Tile } from 'components/Game/Board/Row/Tile'
import { Modal } from 'components/Modal'
import { removeLocalStorage } from 'hooks/useStorage'
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
  function confirmResetGame(): void {
    if (
      // eslint-disable-next-line no-alert
      window.confirm(
        'Are you sure you want to reset all data?\nThis will delete all your progress and challenges.'
      )
    ) {
      resetGame()
    }
  }

  function resetGame(): void {
    removeLocalStorage('gameByLevel')
    window.location.reload()
  }

  return (
    <Modal
      isOpen={!onBoarded}
      onHide={() => {
        setOnBoarded(true)
      }}
    >
      <h1>How to play</h1>
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
      <p>Enter the notes on the piano in the right order.</p>
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
        <br />
        Or there are no available correct spots left for this note.
      </p>
      <hr />
      <ResetButton
        variant="primary"
        light
        type="button"
        onClick={confirmResetGame}
      >
        Reset all data
      </ResetButton>
      <hr />
      <div>
        <div style={{ marginBottom: '8px' }}>
          <a
            href="https://www.jasperdunn.com/"
            style={{
              color: 'black',
            }}
          >
            Jasper Dunn
          </a>{' '}
          © 2023
        </div>
        <div>
          Built with{' '}
          <a
            href="https://tonejs.github.io"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: 'black',
            }}
          >
            Tone.js
          </a>
        </div>
      </div>
    </Modal>
  )
}

const SmallRowGrid = styled(RowGrid)`
  width: 100%;

  @media ${theme.breakpointUp.tablet} {
    width: 320px;
  }
`

const ResetButton = styled(Button)`
  padding: 8px;
`
