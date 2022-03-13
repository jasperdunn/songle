import { useCallback, useEffect, useRef, useState } from 'react'
import { MonoSynth, now, Part, start, Transport } from 'tone'
import { Midi } from '@tonejs/midi'

type MidiPlayerProps = {
  srcUrl: string
}
export function MidiPlayer({ srcUrl }: MidiPlayerProps): JSX.Element {
  const [loadingMidi, setLoadingMidi] = useState(true)
  const [errorOccurred, setErrorOccurred] = useState(false)
  const midiRef = useRef<Midi>()
  const synthRef = useRef<MonoSynth>()

  const initialize = useCallback(async () => {
    try {
      setLoadingMidi(true)
      midiRef.current = await Midi.fromUrl(srcUrl)

      if (midiRef.current.tracks.length !== 1) {
        throw new Error('Only use one Track per MIDI file.')
      }

      if (midiRef.current.header.tempos.length !== 1) {
        throw new Error('Only use one tempo / bpm value per MIDI file.')
      }

      initializeMidiPlayer()
    } catch (error) {
      console.error(error)
      setErrorOccurred(true)
    } finally {
      setLoadingMidi(false)
    }
  }, [srcUrl])

  useEffect(() => {
    initialize()
  }, [initialize])

  function initializeMidiPlayer(): void {
    if (!midiRef.current) {
      return
    }

    const currentTime = now()
    const track = midiRef.current.tracks[0]

    const synth = new MonoSynth({
      envelope: {
        attack: 0,
        attackCurve: 'linear',
        decay: 0,
        decayCurve: 'exponential',
        release: 0.1,
        releaseCurve: 'exponential',
        sustain: 1,
      },
      filter: {
        Q: 2,
        detune: 0,
        frequency: 2000,
        gain: 0,
        rolloff: -12,
        type: 'lowpass',
      },
      filterEnvelope: {
        attack: 0,
        attackCurve: 'linear',
        baseFrequency: 300,
        decay: 1,
        decayCurve: 'exponential',
        exponent: 2,
        octaves: 4,
        release: 0.8,
        releaseCurve: 'exponential',
        sustain: 0,
      },
      oscillator: {
        partialCount: 0,
        phase: 0,
        type: 'sawtooth',
      },
    }).toDestination()
    synthRef.current = synth

    Transport.bpm.set({ value: midiRef.current.header.tempos[0].bpm })

    const part = new Part(
      (time, note) => {
        synth.triggerAttackRelease(
          note.name,
          note.duration,
          time,
          note.velocity
        )

        if (note.index === part.length - 1) {
          Transport.stop()
        }
      },
      track.notes.map((note, index) => ({
        time: note.time + currentTime,
        name: note.name,
        velocity: note.velocity,
        duration: note.duration,
        index,
      }))
    ).start(0)
  }

  if (errorOccurred) {
    return <div>Something went wrong!</div>
  }

  return (
    <>
      {loadingMidi ? (
        <span>Loading...</span>
      ) : (
        <>
          <button
            onClick={async () => {
              /**
               * Most browsers will not play any audio until
               * a user clicks something (like a play button).
               * Invoke this method on a click or keypress event
               * handler to start the audio context.
               */
              await start()
              Transport.start()
            }}
          >
            Play
          </button>
          <button
            onClick={() => {
              Transport.stop()
            }}
          >
            Stop
          </button>
        </>
      )}
    </>
  )
}
