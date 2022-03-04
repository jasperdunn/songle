import { useMidiPlayer } from 'components/Game/GameOverModal/MidiPlayer/useMidiPlayer'
import { Event } from 'midi-player-js'

type MidiPlayerProps = {
  srcUrl: string
}
export function MidiPlayer({ srcUrl }: MidiPlayerProps): JSX.Element {
  const { loading, play, stop } = useMidiPlayer(srcUrl, {
    onMidiEvent: (event: Event) => {
      if (event.name === 'Note on') {
        console.log(event.noteName)
      }
    },
  })

  return (
    <>
      {loading ? (
        <span>Loading...</span>
      ) : (
        <>
          <button onClick={play}>Play</button>
          <button onClick={stop}>Stop</button>
        </>
      )}
    </>
  )
}
