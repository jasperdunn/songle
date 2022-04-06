type NaturalNote = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G'
type SharpNote = 'A#' | 'C#' | 'D#' | 'F#' | 'G#'
type FlatNote = 'Ab' | 'Bb' | 'Db' | 'Eb' | 'Gb'
export type NoteValue = NaturalNote | SharpNote | FlatNote

export type Challenge = {
  melody: NoteValue[]
  title: string
  artist: string
  bpm: number
  midiUrl: string
}

/** Used for validating (coloring) the attempts. */
export type NoteHint =
  /** not found in melody */
  | 0
  /** correct note */
  | 1
  /** correct note in the correct place */
  | 2

export type Note = {
  value: NoteValue
  hint?: NoteHint
}

export type GameOverResult = 'success' | 'fail'

export type LocalStorage = {
  attempts: Note[][]
  currentAttemptIndex: number
}
