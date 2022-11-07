import React, { createContext, useContext, useState } from 'react'
import './App.css'
import { getTurn, isEven, resetBoard, CellState } from './helper'


type GameState = {
  round: number
  setRound: React.Dispatch<React.SetStateAction<number>>
  setWinner: React.Dispatch<React.SetStateAction<string>>
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
    <GameContext.Provider value={{round, setRound, setWinner}}>
    <div className="App">
      {winner ? 
      <h1>Winner: {winner}</h1>
      :
      <h1>Round: {round}</h1>
      }
      <br />
      <div className='board'>
        {board.map(cell => {
          return (
            <Cell cell={cell} ></Cell>
          )
        })}
      </div>
      <br />
      <button onClick={() => resetGame()}>Reset Game</button>
    </div>
    </GameContext.Provider>
  )
}

function Cell(props: { cell: CellState }) {
  const { cell } = props
  const gameState = useContext(GameContext)
  if (!gameState) return null

  const {round, setRound, setWinner} = gameState
  const [state, setState] = useState(cell)

  function handleOnClick(round: number) {
    if (state) return
    setState(getTurn(round))
    setRound(round => round + 1)
  }
  return (
    <div className='cell' onClick={() => handleOnClick(round)}>{state}</div>
  )
}

export default App


