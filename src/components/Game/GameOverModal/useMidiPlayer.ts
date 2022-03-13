import { Midi, Track } from '@tonejs/midi'
import { useCallback, useEffect, useRef, useState } from 'react'
import { MonoSynth, now, Part, start, Transport } from 'tone'

export function useMidiPlayer(srcUrl: string): {
  play: () => Promise<void>
  stop: () => void
  loading: boolean
  playing: boolean
  notePlayed: number | null
} {
  const [loading, setLoading] = useState(true)
  const [playing, setPlaying] = useState(false)
  const [notePlayed, setNotePlayed] = useState<number | null>(null)
  const midiRef = useRef<Midi>()

  const initialize = useCallback(async () => {
    try {
      setLoading(true)
      midiRef.current = await Midi.fromUrl(srcUrl)

      if (midiRef.current.header.tempos.length !== 1) {
        throw new Error('Only use one tempo / bpm value per MIDI file.')
      }

      if (midiRef.current.tracks.length !== 1) {
        throw new Error('Only use one Track per MIDI file.')
      }

      initializeSynthWithMidiTrack(
        midiRef.current.header.tempos[0].bpm,
        midiRef.current.tracks[0]
      )
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }, [srcUrl])

  useEffect(() => {
    initialize()
  }, [initialize])

  function initializeSynthWithMidiTrack(bpm: number, track: Track): void {
    Transport.bpm.set({ value: bpm })

    const synth = new MonoSynth({
      volume: -8,
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

    new Part(
      (time, note) => {
        synth.triggerAttackRelease(
          note.name,
          note.duration,
          time,
          note.velocity
        )

        setNotePlayed(note.index)
      },
      track.notes.map((note, index) => ({
        time: note.time + now(),
        name: note.name,
        velocity: note.velocity,
        duration: note.duration,
        index,
      }))
    ).start(0)

    Transport.schedule(() => {
      stop()
    }, track.duration)
  }

  async function play(): Promise<void> {
    /**
     * Most browsers will not play any audio until
     * a user clicks something (like a play button).
     * Invoke this method on a click or keypress event
     * handler to start the audio context.
     */
    await start()
    Transport.start()
    setPlaying(true)
  }

  function stop(): void {
    setNotePlayed(null)
    Transport.stop()
    setPlaying(false)
  }

  return { play, stop, loading, playing, notePlayed }
}
