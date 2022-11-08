import React, { createContext, useContext, useState } from 'react'
import './App.css'
import { getTurn, isEven, resetBoard, CellState, checkForWinner, makeMove } from './helper'


type GameState = {
  setWinner: React.Dispatch<React.SetStateAction<string>>
  board: CellState[]
  setBoard: React.Dispatch<React.SetStateAction<CellState[]>>
  aiMode: boolean
}

const GameContext = createContext<GameState | null>(null)

function App() {
  const [board, setBoard] = useState<CellState[]>(resetBoard())
  const [winner, setWinner] = useState('')
  const [aiMode, setAIMode] = useState(false)

  function resetGame() {
    setBoard(resetBoard())
    setWinner('')
  }

  function playWithAI() {
    resetGame()
    setAIMode(aiMode => !aiMode)
  }

  return (
    <GameContext.Provider value={{ setWinner, board, setBoard, aiMode}}>
    <div className="App">
      {winner ? 
      <h1>Winner: {winner}</h1>
      :
      aiMode 
      ? <h1>Playing With AI</h1>
      : <h1>Turn: {getTurn(board)}</h1>
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
      <div>
        <label htmlFor="ai-mode">Play with AI </label>
          <input id='ai-mode' type="checkbox" onClick={playWithAI} defaultChecked={aiMode}/>
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

  const { setBoard, board, setWinner, aiMode} = gameState

  function handleOnClick() {
    if (cell) return
    // make move
    const move = getTurn(board)
    const newBoard = [...board]
    newBoard[idx] = move

    if (aiMode) {
      let AIMove = makeMove(newBoard)
      if (AIMove != null) {
        newBoard[AIMove] = 'o'
      }
    }

    setBoard(newBoard)

    // check for winner
    const winner = checkForWinner(newBoard)
    if (winner) {
      setWinner(winner)
    } 
  }
  return (
    <div className='cell' onClick={handleOnClick}>{cell}</div>
  )
}

export default App

