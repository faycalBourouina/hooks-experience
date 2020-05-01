import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square({value, activateSquare}) {
    return (
      <button 
        className="square"
        onClick={activateSquare}
      >
        { value }
      </button>
    )
}

function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [next, setNext] = useState('F');
  const [status, setStatus] = useState(`Next player: ${next}`);
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    calculateWinner();
    if (winner) {
      return setStatus(`We have a winner: ${winner}`);
    }
      setStatus(`Next player: ${next}`);
  },[next, winner]);
  

  function renderSquare(i) { 
    const nextSquares = [...squares];
    return <Square 
    value={squares[i]} 
    activateSquare={() => { 
              if (winner || squares[i]) {
                return;
              }
              nextSquares[i] = next;
              setSquares(nextSquares);
              next == 'F' ? setNext('I') : setNext('F');
              }}
            />;
  }

  function calculateWinner() {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        setWinner(squares[i]);
      }
    }
    return null;
  };

  return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className="board-row">
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className="board-row">
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
      </div>
    );
}

function Game() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

