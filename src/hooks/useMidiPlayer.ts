import { Midi } from '@tonejs/midi'
import { usePreviousValue } from 'hooks/usePreviousValue'
import { Melody, Note, NoteValue } from 'components/Game/types'
import { useCallback, useEffect, useRef, useState } from 'react'
import { MonoSynth, now, Part, start, Transport } from 'tone'
import { getErrorMessage } from 'common/error'

export function useMidiPlayer(
  srcUrl: string,
  notes: Note[] = []
): {
  play: () => void
  stop: () => void
  loading: boolean
  playing: boolean
  notePlaying: number | null
  melody: Melody
  playNote: (note: NoteValue) => void
} {
  const [loading, setLoading] = useState(true)
  const [playing, setPlaying] = useState(false)
  const [notePlaying, setNotePlaying] = useState<number | null>(null)
  const midiRef = useRef<Midi>()
  const synthRef = useRef<MonoSynth>()
  const partRef = useRef<Part>()
  const previousNotes = usePreviousValue(notes)
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

          setNotePlaying(note.index)
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
      console.error(getErrorMessage(error))
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
    if (
      !midiRef.current ||
      !partRef.current ||
      notes.length !== midiRef.current.tracks[0].notes.length
    ) {
      return
    }

    partRef.current.clear()

    partRef.current = new Part(
      (time, note) => {
        synthRef.current?.triggerAttackRelease(
          note.name,
          note.duration,
          time,
          note.velocity
        )

        setNotePlaying(note.index)
      },
      midiRef.current.tracks[0].notes.map((note, index) => ({
        time: note.time,
        name: notes[index].value,
        velocity: note.velocity,
        duration: note.duration,
        index,
      }))
    ).start(0)
  }, [notes, previousNotes])

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
    await start()
    Transport.start()
    setPlaying(true)
  }

  function stop(): void {
    setNotePlaying(null)
    Transport.stop()
    setPlaying(false)
  }

  function playNote(note: NoteValue): void {
    // make the duration be as long as the user holds down the key
    synthRef.current?.triggerAttackRelease(note, 0.5)
  }

  return { play, stop, loading, playing, notePlaying, melody, playNote }
}
