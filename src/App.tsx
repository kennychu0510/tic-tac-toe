import React, { createContext, useContext, useState } from 'react'
import './App.css'
import { getTurn, isEven, resetBoard, CellState, checkForWinner } from './helper'


type GameState = {
  round: number
  setRound: React.Dispatch<React.SetStateAction<number>>
  setWinner: React.Dispatch<React.SetStateAction<string>>
  board: CellState[]
  setBoard: React.Dispatch<React.SetStateAction<CellState[]>>
}

const GameContext = createContext<GameState | null>(null)

function App() {
  const [board, setBoard] = useState<CellState[]>(resetBoard())
  const [round, setRound] = useState(0)
  const [winner, setWinner] = useState('')

  function resetGame() {
    setBoard(resetBoard())
    setRound(0)
    setWinner('')
  }

  return (
    <GameContext.Provider value={{round, setRound, setWinner, board, setBoard}}>
    <div className="App">
      {winner ? 
      <h1>Winner: {winner}</h1>
      :
      <h1>Round: {round}</h1>
      }
      <br />
      <div className='board'>
        {board.map((cell, idx) => {
          return (
            <Cell key={idx} cell={cell} idx={idx} ></Cell>
          )
        })}
      </div>
      <br />
      <button onClick={() => resetGame()}>Reset Game</button>
    </div>
    </GameContext.Provider>
  )
}

function Cell(props: { cell: CellState, idx: number }) {
  const { cell, idx } = props
  const gameState = useContext(GameContext)
  if (!gameState) return null

  const {round, setRound, setBoard, board, setWinner} = gameState

  function handleOnClick(round: number) {
    if (cell) return
    const move = getTurn(round)
    const newBoard = board
    newBoard[idx] = move
    
    setBoard(newBoard)
    const winner = checkForWinner(newBoard)
    if (winner) {
      setWinner(winner)
    } else {
      setRound(round => round + 1)
    }
  }
  return (
    <div className='cell' onClick={() => handleOnClick(round)}>{cell}</div>
  )
}

export default App


