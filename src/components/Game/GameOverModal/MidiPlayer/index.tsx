import { useMidiPlayer } from 'components/Game/GameOverModal/MidiPlayer/useMidiPlayer'
import { Event } from 'midi-player-js'
import { useEffect, useRef } from 'react'
import { Synth, start, Frequency } from 'tone'

type MidiPlayerProps = {
  srcUrl: string
}
export function MidiPlayer({ srcUrl }: MidiPlayerProps): JSX.Element {
  const synthRef = useRef<Synth>()

  const { loading, play, stop, bpm } = useMidiPlayer(srcUrl, {
    onMidiEvent: (event: Event) => {
      if (event.name === 'Note on') {
        synthRef.current?.triggerAttackRelease(
          Frequency(event.noteNumber, 'midi').toFrequency(),
          '8n'
        )
      }
    },
  })

  useEffect(() => {
    synthRef.current = new Synth().toDestination()
  }, [])

  useEffect(() => {
    if (synthRef.current) {
      synthRef.current.context.transport.bpm.value = bpm
    }
  }, [bpm])

  return (
    <>
      {loading ? (
        <span>Loading...</span>
      ) : (
        <>
          <button
            onClick={() => {
              /**
               * Most browsers will not play any audio until
               * a user clicks something (like a play button).
               * Invoke this method on a click or keypress event
               * handler to start the audio context.
               */
              start()
              play()
            }}
          >
            Play
          </button>
          <button onClick={stop}>Stop</button>
        </>
      )}
    </>
  )
}
