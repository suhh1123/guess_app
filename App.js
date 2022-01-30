import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from './components/Header';
import GameStartScreen from './screens/GameStartScreen';

const App = () => {
  return (
    <View style={styles.container}> 
      <Header title="Guess a Number"/>
      <GameStartScreen />
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
