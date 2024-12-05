import React, { useState } from 'react';
import Board from './Board';
import './App.css';

function App() {
  const [currentPlayer, setCurrentPlayer] = useState('●');
  const [winner, setWinner] = useState(null);
  const [resetTrigger, setResetTrigger] = useState(false);

  const handleGameEnd = (winner) => {
    setWinner(winner);
  };

  const resetGame = () => {
    setResetTrigger(true); // 触发重置信号
    setWinner(null);       // 清空胜利状态
    setCurrentPlayer('●'); // 重置玩家为黑棋
  };

  return (
    <div className="App">
      <h1>五子棋</h1>
      {winner ? (
        <h2>🎉 玩家 {winner} 胜利！</h2>
      ) : (
        <h2>当前玩家: {currentPlayer}</h2>
      )}
      <Board
        currentPlayer={currentPlayer}
        setCurrentPlayer={setCurrentPlayer}
        winner={winner}
        onGameEnd={handleGameEnd}
        resetTrigger={resetTrigger}
        onResetComplete={() => setResetTrigger(false)}
      />
      <button onClick={resetGame} className="reset-button">
        重置游戏
      </button>
    </div>
  );
}

export default App;
