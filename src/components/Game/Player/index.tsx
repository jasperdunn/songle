import { Button } from 'components/Button'
import { FiPlay, FiSquare } from 'react-icons/fi'

type PlayerProps = {
  play: () => void
  stop: () => void
  loading: boolean
  playing: boolean
}
export function Player({
  play,
  stop,
  loading,
  playing,
}: PlayerProps): JSX.Element {
  if (loading) {
    return <>Loading...</>
  }

  if (playing) {
    return (
      <Button id="keyStop" onClick={stop} type="button" title="stop">
        <FiSquare size={48} color="black" />
      </Button>
    )
  }

  return (
    <Button id="keyPlay" onClick={play} type="button" title="play">
      <FiPlay size={48} color="black" />
    </Button>
  )
}
