import React from 'react';

const TitleScreen = ({ onStart }) => (
  <div>
    <h1>Endless Runner</h1>
    <button onClick={onStart}>Start Game</button>
  </div>
);

export default TitleScreen;
