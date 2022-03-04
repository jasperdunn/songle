import axios from 'axios'
import { useCallback, useEffect, useRef, useState } from 'react'
import MidiPlayerJs, { Event, Player } from 'midi-player-js'

type UseMidiPlayerReturnType = {
  loading: boolean
  play: () => void
  stop: () => void
  bpm: number
}

type UseMidiPlayerConfig = {
  onMidiEvent?: (event: Event) => void
  onFileEnd?: () => void
}

export function useMidiPlayer(
  url: string,
  config?: UseMidiPlayerConfig
): UseMidiPlayerReturnType {
  const [loading, setLoading] = useState(true)
  const midiPlayerRef = useRef<Player>(new MidiPlayerJs.Player())
  const configRef = useRef<UseMidiPlayerConfig | undefined>(config)

  const initialize = useCallback(async (): Promise<void> => {
    try {
      const response = await axios.get(url, { responseType: 'arraybuffer' })

      if (response.data) {
        midiPlayerRef.current.loadArrayBuffer(response.data)
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }, [url])

  useEffect(() => {
    initialize()
  }, [initialize])

  useEffect(() => {
    configRef.current = config
  }, [config])

  useEffect(() => {
    if (configRef.current?.onFileEnd) {
      midiPlayerRef.current.on('endOfFile', configRef.current.onFileEnd)
    }
    if (configRef.current?.onMidiEvent) {
      midiPlayerRef.current.on('midiEvent', configRef.current.onMidiEvent)
    }
  }, [configRef])

  return {
    loading,
    play: () => {
      midiPlayerRef.current.play()
    },
    stop: () => {
      midiPlayerRef.current.stop()
    },
    bpm: midiPlayerRef.current.tempo,
  }
}
