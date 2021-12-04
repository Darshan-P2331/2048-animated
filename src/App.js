import { useState } from "react";
import Cell from "./components/Cell";
import GameOverlay from "./components/GameOverlay";
import Tile from "./components/Tile";
import { Board } from "./helper";
import useEvent from "./hooks/useEvent";

function App() {
  const [board, setBoard] = useState(new Board());

  const handleKeyDown = (event) => {
    if (board.hasWon()) {
      return;
    }

    if (event.keyCode >= 37 && event.keyCode <= 40) {
      let direction = event.keyCode - 37;
      let boardClone = Object.assign(
        Object.create(Object.getPrototypeOf(board)),
        board
      );
      let newBoard = boardClone.move(direction);
      setBoard(newBoard);
    }
  };

  const resetGame = () => {
    setBoard(new Board());
  }

  useEvent("keydown", handleKeyDown);

  const cells = board.cells.map((row, rowIndex) => {
    return (
      <div key={rowIndex}>
        {row.map((col, colIndex) => {
          return <Cell key={rowIndex * board.size + colIndex} />;
        })}
      </div>
    );
  });

  const tiles = board.tiles
    .filter((tile) => tile.value !== 0)
    .map((tile, tileIndex) => {
      return <Tile tile={tile} key={tileIndex} />;
    });

  return (
    <div>
      <div className="details-box">
        <div className="resetButton" onClick={resetGame}>New Game</div>
        <div className='score-box'>
          <div className='score-header'>SCORE</div>
          <div>{board.score}</div>
        </div>
      </div>
      <div className="board">
        {cells}
        {tiles}
        <GameOverlay onRestart={resetGame} board={board} />
      </div>
    </div>
  );
}

export default App;
