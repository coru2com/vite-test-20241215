import React, { useState } from 'react';
import Game from './Game';
import TitleScreen from './TitleScreen';

const App = () => {
  const [gameStarted, setGameStarted] = useState(false);

  const startGame = () => {
    setGameStarted(true);
  };

  return gameStarted ? <Game /> : <TitleScreen onStart={startGame} />;
};

export default App;
