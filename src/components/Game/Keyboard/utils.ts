export const computerKeys = [
  'a',
  's',
  'd',
  'f',
  'g',
  'h',
  'j',
  'w',
  'e',
  't',
  'y',
  'u',
  'Enter',
  'Backspace',
  ' ',
] as const

export type ComputerKey = typeof computerKeys[number]

export function clickButton(key: ComputerKey): void {
  const keyElement = getKeyElement(key)

  if (keyElement) {
    keyElement?.classList?.add('active')
    keyElement?.click()
  }
}

export function keyUp(this: Document, event: KeyboardEvent): void {
  const key = event.key as ComputerKey

  if (!computerKeys.includes(key)) {
    return
  }

  const keyElement = getKeyElement(key)

  if (keyElement) {
    keyElement.classList.remove('active')
  }
}

function getKeyElement(key: ComputerKey): HTMLElement | null {
  const keyId = getKeyIdFromComputerKey(key)

  if (keyId === null) {
    return null
  }

  return document.getElementById(keyId)
}

function getKeyIdFromComputerKey(key: ComputerKey): string | null {
  switch (key) {
    case 'a':
      return 'keyC'

    case 'w':
      return 'keyC#'

    case 's':
      return 'keyD'

    case 'e':
      return 'keyD#'

    case 'd':
      return 'keyE'

    case 'f':
      return 'keyF'

    case 't':
      return 'keyF#'

    case 'g':
      return 'keyG'

    case 'y':
      return 'keyG#'

    case 'h':
      return 'keyA'

    case 'u':
      return 'keyA#'

    case 'j':
      return 'keyB'

    case 'Enter':
      return 'keyEnter'

    case 'Backspace':
      return 'keyBackspace'

    case ' ':
      return 'keySpace'

    default:
      return null
  }
}
