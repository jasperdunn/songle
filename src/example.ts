export function addDash(string: string, length: number): string {
  return string
    .replace('-', '')
    .replace(new RegExp(`(.{${length}})`, 'g'), '$1-')
    .replace(/([-]+$)/, '')
}
