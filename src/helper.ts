export type CellState = 'x' | 'o' | null

export function isEven(num: number) {
  return num % 2 === 0
}

export function getTurn(round: number) {
  return isEven(round) ? 'x' : 'o'
}

export function resetBoard(): CellState[] {
  return new Array(9).fill(null)
}
