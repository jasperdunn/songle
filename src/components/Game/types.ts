type NaturalNote = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G'
type SharpNote = 'A#' | 'C#' | 'D#' | 'F#' | 'G#'
type FlatNote = 'Ab' | 'Bb' | 'Db' | 'Eb' | 'Gb'
export type Octave = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8
export type NoteValue = `${NaturalNote | SharpNote | FlatNote}${Octave}`

export type Challenge = {
  title: string
  artist: string
  spotifyUrl: string
  youtubeUrl: string
  appleMusicUrl: string
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

export type Attempt = Note[]
export type Melody = NoteValue[]

export type GameOverResult = 'won' | 'lost'
