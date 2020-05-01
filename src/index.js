import React, { useState, useEffect, useReducer } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square({value, handleClick}) {
    return (
      <button 
        className="square"
        onClick={handleClick}
      >
        { value }
      </button>
    )
}

function Board() {
  const boardReducer = (state, actions) => {
    switch(actions.type) {
      //case 'next' :
      //case 'status' :
      case 'winner':
        return { winner: actions.payload };
      default: 
        throw new Error();
    }
  } 

  const [squares, setSquares] = useState(Array(9).fill(null));
  const [next, setNext] = useState('F');
  const [status, setStatus] = useState(`Next player: ${next}`);
  //const [winner, setWinner] = useState(null);
  const [board, dispatch] = useReducer(boardReducer, { winner: null })

  useEffect(() => {
    calculateWinner();
    if (board.winner) {
      return setStatus(`We have a winner: ${board.winner}`);
    }
      setStatus(`Next player: ${next}`);
  },[next, board.winner]);
  

  const  calculateWinner= () => {
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
        //setWinner(squares[a]);
        dispatch({type: 'winner', payload: squares[a]});
      }
    }
    return null;
  };

  const handleClick = i => {
    const nextSquares = [...squares];
    if (board.winner || squares[i]) {
      return;
    }
    nextSquares[i] = next;
    setSquares(nextSquares);
    next == 'F' ? setNext('I') : setNext('F');

  }
  
  const renderSquare= i => <Square value={squares[i]} 
                                   handleClick={() => handleClick(i)} 
                           />;

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

