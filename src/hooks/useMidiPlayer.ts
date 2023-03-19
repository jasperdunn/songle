import { Midi } from '@tonejs/midi'
import { Melody, ScientificNoteName, Attempt } from 'components/Game/types'
import { useCallback, useEffect, useRef, useState } from 'react'
import { now, Part, start, Transport, Sampler } from 'tone'
import { getErrorMessage } from 'common/error'
import { getMedianNoteName } from 'components/Game/utils'

export function useMidiPlayer(
  srcUrl: string,
  listenableAttempt: Attempt = [],
  listenableAttemptIndex: number | null
): {
  play: () => void
  stop: () => void
  loading: boolean
  playing: boolean
  notePlaying: number | null
  melody: Melody
  playNote: (note: ScientificNoteName) => void
} {
  const [loading, setLoading] = useState(true)
  const [playing, setPlaying] = useState(false)
  const [notePlaying, setNotePlaying] = useState<number | null>(null)
  const midiRef = useRef<Midi>()
  const samplerRef = useRef<Sampler>()
  const partRef = useRef<Part>()
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

      const medianNoteName = getMedianNoteName(midiRef.current.tracks[0].notes)

      partRef.current = new Part(
        (time, note) => {
          samplerRef.current?.triggerAttackRelease(
            note.name,
            note.duration,
            time,
            note.velocity
          )

          setNotePlaying(note.index)
        },
        midiRef.current.tracks[0].notes.map((note, index) => {
          return {
            time: note.time,
            name: medianNoteName,
            velocity: note.velocity,
            duration: note.duration,
            index,
          }
        })
      ).start(0)

      setMelody(
        midiRef.current.tracks[0].notes.map(
          (note) => note.name as ScientificNoteName
        )
      )
    } catch (error) {
      console.error(getErrorMessage(error))
    } finally {
      setLoading(false)
    }
  }, [srcUrl])

  useEffect(() => {
    if (!samplerRef.current) {
      samplerRef.current = new Sampler({
        urls: {
          A0: 'A0.mp3',
          C1: 'C1.mp3',
          'D#1': 'Ds1.mp3',
          'F#1': 'Fs1.mp3',
          A1: 'A1.mp3',
          C2: 'C2.mp3',
          'D#2': 'Ds2.mp3',
          'F#2': 'Fs2.mp3',
          A2: 'A2.mp3',
          C3: 'C3.mp3',
          'D#3': 'Ds3.mp3',
          'F#3': 'Fs3.mp3',
          A3: 'A3.mp3',
          C4: 'C4.mp3',
          'D#4': 'Ds4.mp3',
          'F#4': 'Fs4.mp3',
          A4: 'A4.mp3',
          C5: 'C5.mp3',
          'D#5': 'Ds5.mp3',
          'F#5': 'Fs5.mp3',
          A5: 'A5.mp3',
          C6: 'C6.mp3',
          'D#6': 'Ds6.mp3',
          'F#6': 'Fs6.mp3',
          A6: 'A6.mp3',
          C7: 'C7.mp3',
          'D#7': 'Ds7.mp3',
          'F#7': 'Fs7.mp3',
          A7: 'A7.mp3',
          C8: 'C8.mp3',
        },
        release: 1,
        baseUrl: 'https://songle-wrangler.jasperdunn.workers.dev/salamander/',
      }).toDestination()
    }

    loadMidi()
  }, [loadMidi])

  useEffect(() => {
    if (listenableAttempt.length !== melody.length) {
      return
    }

    if (partRef.current) {
      partRef.current.clear()
    }

    partRef.current = new Part(
      (time, note) => {
        samplerRef.current?.triggerAttackRelease(
          note.name,
          note.duration,
          time,
          note.velocity
        )

        setNotePlaying(note.index)
      },
      midiRef.current?.tracks[0].notes.map((note, index) => ({
        time: note.time,
        name: listenableAttempt[index].name,
        velocity: note.velocity,
        duration: note.duration,
        index,
      }))
    ).start(0)
  }, [listenableAttempt, melody.length])

  // setInterval(() => {
  //   console.log({
  //     now: Transport.now(),
  //     position: Transport.position,
  //     progress: Transport.progress,
  //     seconds: Transport.seconds,
  //     ticks: Transport.ticks,
  //   })
  // }, 1000)

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

  function playNote(note: ScientificNoteName): void {
    // TODO make the duration be as long as the user holds down the key
    samplerRef.current?.triggerAttackRelease(note, 0.5)
  }

  return { play, stop, loading, playing, notePlaying, melody, playNote }
}
