export type CellState = 'x' | 'o' | null

export function isEven(num: number) {
  return num % 2 === 0
}

export function getTurn(board: CellState[]): CellState {
  return isEven(board.filter(cell => cell == null).length) ? 'o' : 'x'
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
    for (let j = i; j < i + 7; j += 3) {
      if (board[j] !== winner) continue outerLoop
    }
    return winner
  }

  // check diagonals
  if (board[0] === board[4] && board[4] === board[8]) return board[0]
  if (board[2] === board[4] && board[4] === board[6]) return board[2]

  if (board.includes(null)) {
    return null
  }
  return 'none'
}

export function isFull(board: CellState[]) {
  return board.filter(cell => cell == null).length === 0
}

export function makeMove(board: CellState[]) {
  if (isFull(board)) return null
  const bestMoveCount:{[key: number]: number} = {}
  const move = getTurn(board)
  for (let i = 0; i < board.length; i++) {
    const newBoard = [...board]
    if (!board[i]) {
      newBoard[i] = move
      calculateMoveScore(newBoard, i)
    }
  }

  function takeMove(board: CellState[], stepTook: number) {
    let move = getTurn(board)
    for (let i = 0; i < board.length; i++) {
      if (!board[i]) {
        const newBoard = [...board]
        newBoard[i] = move
        const score = calculateCurrentMoveScore(newBoard)
        if (score) {
          return bestMoveCount[stepTook] = score
        } else {
          if (isFull(newBoard)) {
            bestMoveCount[stepTook] = 0
          } else {
            takeMove(newBoard, stepTook)
          }
        }
      }
    }
  }

  function calculateMoveScore(board: CellState[], stepTook: number) {
    if (checkForWinner(board) === 'o') {
      bestMoveCount[stepTook] = 1 * board.filter(cell => cell != null).length
    }
    else if (checkForWinner(board) === 'x') {
      bestMoveCount[stepTook] = -1 * board.filter(cell => cell == null).length
    }
    else if (checkForWinner(board) === 'none') {
      bestMoveCount[stepTook] = 0
    }
    else {
      takeMove(board, stepTook)
    }
  }

  function calculateCurrentMoveScore(board: CellState[]): number | null {
    if (checkForWinner(board) === 'o') return 1 * board.filter(cell => cell != null).length
    else if (checkForWinner(board) === 'x') return -1 * board.filter(cell => cell == null).length
    else if (checkForWinner(board) === 'none') return 0
    else {
      return null
    }
  }
  // console.log(Object.entries(bestMoveCount).sort((a, b) => b[1] - a[1])[0][0])
  const bestMove = Number(Object.entries(bestMoveCount).sort((a, b) => b[1] - a[1])[0][0])
  console.log(bestMoveCount)
  return bestMove
}

// let board = [
//   'x', null, 'x', 
//   'x', 'o', 'o', 
//   'o', 'o', 'x'] as CellState[] 
// console.log(makeMove(board))
