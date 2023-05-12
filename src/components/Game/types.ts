type NaturalNote = 'C' | 'D' | 'E' | 'F' | 'G' | 'A' | 'B'
type SharpNote = 'C#' | 'D#' | 'F#' | 'G#' | 'A#'
type FlatNote = 'Db' | 'Eb' | 'Gb' | 'Ab' | 'Bb'
export type NoteName = NaturalNote | SharpNote | FlatNote
export type Octave = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8
export type ScientificNoteName = `${NoteName}${Octave}`

export type Challenge = {
  title: string
  artist: string
  spotifyUrl: string
  youtubeUrl: string
  appleMusicUrl: string
}

/** Used for validating (coloring) the attempts. */
// Todo use enum
export type NoteHint =
  /** not found in melody */
  | 0
  /** correct note */
  | 1
  /** correct note in the correct place */
  | 2

export type AttemptedNote = {
  name: ScientificNoteName
  hint?: NoteHint
}

export type Attempt = AttemptedNote[]
export type Melody = ScientificNoteName[]

export type GameOverResult = 'won' | 'lost'
