import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, ScrollView, FlatList } from 'react-native';
import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import MainButton from '../components/MainButton';
import defaultStyle from '../constants/default-style';
import Colors from '../constants/colors';

const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const rndNum = Math.floor(Math.random() * (max - min)) + min;
  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
}

const renderListItem = (value, numOfRound) => (
  <View style={styles.listItem} key={value}>
    <Text style={defaultStyle.bodyText}>#{numOfRound}</Text>
    <Text style={defaultStyle.bodyText}>{value}</Text>
  </View>
); 

const GameScreen = props => {
  const initialGuess = generateRandomBetween(1, 100, props.userChoice);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [pastGuess, setPastGuess] = useState([initialGuess]);
  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  const { userChoice, onGameOver } = props;

  useEffect(() => {
    if (currentGuess === userChoice) {
      onGameOver(pastGuess);
    }
  }, [currentGuess, userChoice, onGameOver]);

  const nextGuessHandler = direction => {
    if ((direction === 'lower' && currentGuess < props.userChoice) || (direction === 'higher' && currentGuess > props.userChoice)) {
      Alert.alert('Don\'t lie!', 'You know that this is wrong...', [{ text: 'Sorry', style: 'cancel' }]);
      return;
    }
    if (direction === 'lower') {
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess + 1;
    }
    const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
    setCurrentGuess(nextNumber);
    setPastGuess(curPastGuess => [nextNumber, ...curPastGuess]);
  };

  return (
    <View style={styles.screen}>
      <Text>Opponent's Guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <MainButton onPress={nextGuessHandler.bind(this, 'lower')}>
          LOWER
        </MainButton>
        <MainButton onPress={nextGuessHandler.bind(this, 'higher')}>
          HIGHER
        </MainButton>
      </Card>
      <View style={styles.listContainer}>
        <ScrollView contentContainerStyle={styles.list}>
          {pastGuess.map((guess, index) => (
            renderListItem(guess, pastGuess.length - index)
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    width: '100%',
    padding: 10,
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
    width: 300,
    maxWidth: '80%',
  },
  listContainer: {
    width: '80%',
  },
  list: {
    alignItems: 'center',
  }, 
  listItem: {
    borderColor: Colors.primary,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  }
});

export default GameScreen;