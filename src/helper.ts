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

export function checkForWinner(board: CellState[]) {
  // index for consecutive row: 0,1,2   3,4,5   6,7,8
  // index for consecutive column: 0,3,6    1,4,7   2,5,8
  // index for diagonals: 0,4,6   2,4,8

  // check rows
  outerLoop:
  for (let i = 0; i < board.length; i += 3) {
    if (!board[i]) continue outerLoop;
    let winner = board[i]
    for (let j = i; j < i + 3; j++) {
      if (board[j] !== winner) continue outerLoop
    }
    return winner
  }

  // check columns
  outerLoop:
  for (let i = 0; i < board.length; i++) {
    if (!board[i]) continue outerLoop;
    let winner = board[i]
    for (let j = i; j < i + 7; j+=3) {
      if (board[j] !== winner) continue outerLoop
    }
    return winner
  }

  // check diagonals
  if (board[0] === board[4] && board[4] === board[8] ) return board[0]
  if (board[2] === board[4] && board[4] === board[6]) return board[2]

  return null
}
