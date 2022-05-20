import { Midi } from '@tonejs/midi'
import { usePreviousValue } from 'common/usePreviousValue'
import { Attempt, Melody, NoteValue } from 'components/Game/types'
import { useCallback, useEffect, useRef, useState } from 'react'
import { MonoSynth, now, Part, start, Transport } from 'tone'

export function useMidiPlayer({
  srcUrl,
  attempts,
  currentAttemptIndex,
}: {
  srcUrl: string
  attempts: Attempt[]
  currentAttemptIndex: number
}): {
  play: () => void
  stop: () => void
  loading: boolean
  playing: boolean
  notePlayed: number | null
  melody: Melody
} {
  const [loading, setLoading] = useState(true)
  const [playing, setPlaying] = useState(false)
  const [notePlayed, setNotePlayed] = useState<number | null>(null)
  const midiRef = useRef<Midi>()
  const synthRef = useRef<MonoSynth>()
  const partRef = useRef<Part>()
  const prevAttemptIndex = usePreviousValue(currentAttemptIndex)
  const [melody, setMelody] = useState<Melody>([])

  const loadMidi = useCallback(async () => {
    try {
      setLoading(true)
      midiRef.current = await Midi.fromUrl(srcUrl)

      if (midiRef.current.header.tempos.length !== 1) {
        throw new Error('Only use one tempo / bpm value per MIDI file.')
      }

      if (midiRef.current.tracks.length !== 1) {
        throw new Error('Only use one Track per MIDI file.')
      }

      Transport.bpm.set({ value: midiRef.current.header.tempos[0].bpm })
      Transport.schedule(() => {
        stop()
      }, midiRef.current.tracks[0].duration)

      partRef.current = new Part(
        (time, note) => {
          synthRef.current?.triggerAttackRelease(
            note.name,
            note.duration,
            time,
            note.velocity
          )

          setNotePlayed(note.index)
        },
        midiRef.current.tracks[0].notes.map((note, index) => {
          return {
            time: note.time + now(),
            name: 'C1',
            velocity: note.velocity,
            duration: note.duration,
            index,
          }
        })
      ).start(0)

      setMelody(
        midiRef.current.tracks[0].notes.map((note) => note.name as NoteValue)
      )
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }, [srcUrl])

  useEffect(() => {
    if (!synthRef.current) {
      setupSynth()
    }

    loadMidi()
  }, [loadMidi])

  useEffect(() => {
    if (!midiRef.current || !partRef.current) {
      return
    }

    if (prevAttemptIndex !== currentAttemptIndex) {
      partRef.current.clear()

      partRef.current = new Part(
        (time, note) => {
          synthRef.current?.triggerAttackRelease(
            note.name,
            note.duration,
            time,
            note.velocity
          )

          setNotePlayed(note.index)
        },
        midiRef.current.tracks[0].notes.map((note, index) => ({
          time: note.time,
          name: attempts[currentAttemptIndex - 1][index].value,
          velocity: note.velocity,
          duration: note.duration,
          index,
        }))
      ).start(0)
    }
  }, [attempts, currentAttemptIndex, prevAttemptIndex])

  // setInterval(() => {
  //   console.log({
  //     now: Transport.now(),
  //     position: Transport.position,
  //     progress: Transport.progress,
  //     seconds: Transport.seconds,
  //     ticks: Transport.ticks,
  //   })
  // }, 1000)

  function setupSynth(): void {
    synthRef.current = new MonoSynth({
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

  return { play, stop, loading, playing, notePlayed, melody }
}
