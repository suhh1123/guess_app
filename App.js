import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';

import Header from './components/Header';
import GameStartScreen from './screens/GameStartScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';

const App = () => {
  const [userNumber, setUserNumber] = useState();
  const [guessRounds, setGuessRounds] = useState([]);

  const startGameHandler = selectedNumber => {
    setUserNumber(selectedNumber);
    setGuessRounds([]);
  };

  const gameOverHandler = numOfRounds => {
    setGuessRounds(numOfRounds);
  };

  const configureNewGameHandler = () => {
    setGuessRounds([]);
    setUserNumber(null);
  };

  let content = <GameStartScreen onStartGame={startGameHandler} />

  if (userNumber && guessRounds.length <= 0) {
    content = <GameScreen userChoice={userNumber} onGameOver={gameOverHandler}/>
  } else if (guessRounds.length > 0) {
    content = <GameOverScreen roundsNumber={guessRounds.length} userNumber={userNumber} onRestart={configureNewGameHandler}/>
  }

  return (
    <View style={styles.container}>
      <Header title="Guess a Number" />
      {content}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default App;
