import React, { useState, useEffect } from 'react';
import './Board.css';

const Board = ({ currentPlayer, setCurrentPlayer, winner, onGameEnd, resetTrigger, onResetComplete }) => {
  const size = 15; // 棋盘大小
  const [grid, setGrid] = useState(
    Array(size).fill(null).map(() => Array(size).fill(null))
  );

  useEffect(() => {
    if (resetTrigger) {
      setGrid(Array(size).fill(null).map(() => Array(size).fill(null))); // 清空棋盘
      onResetComplete(); // 通知父组件重置完成
    }
  }, [resetTrigger, size, onResetComplete]);

  const handleClick = (row, col) => {
    if (grid[row][col] || winner) return; // 如果已有棋子或游戏已结束，忽略点击
    const newGrid = grid.map((row) => [...row]);
    newGrid[row][col] = currentPlayer;
    setGrid(newGrid);

    // 检查胜利
    if (checkWinner(newGrid, row, col, currentPlayer)) {
      onGameEnd(currentPlayer);
      return;
    }

    // 切换玩家
    setCurrentPlayer(currentPlayer === '●' ? '○' : '●');
  };

  const checkWinner = (grid, row, col, player) => {
    const directions = [
      [0, 1], // 水平
      [1, 0], // 垂直
      [1, 1], // 主对角线
      [1, -1], // 副对角线
    ];

    for (let [dx, dy] of directions) {
      let count = 1;

      // 检查一个方向
      for (let i = 1; i < 5; i++) {
        const x = row + i * dx;
        const y = col + i * dy;
        if (grid[x] && grid[x][y] === player) count++;
        else break;
      }

      // 检查反方向
      for (let i = 1; i < 5; i++) {
        const x = row - i * dx;
        const y = col - i * dy;
        if (grid[x] && grid[x][y] === player) count++;
        else break;
      }

      if (count >= 5) return true;
    }
    return false;
  };

  return (
    <div className="board">
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((cell, colIndex) => (
            <div
              key={colIndex}
              className="cell"
              onClick={() => handleClick(rowIndex, colIndex)}
            >
              {cell}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;
