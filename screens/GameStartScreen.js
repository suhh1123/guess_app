import React, { useState } from 'react';
import { Button, StyleSheet, Text, View, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import Card from '../components/Card';
import Input from '../components/Input';
import NumberContainer from '../components/NumberContainer';
import MainButton from '../components/MainButton';
import colors from '../constants/colors';
import defaultStyle from '../constants/default-style';

const GameStartScreen = props => {
  const [enteredValue, setEnteredValue] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState();

  const numberInputHandler = inputText => {
    setEnteredValue(inputText.replace(/[^0-9]/g, ''));
  }
  
  const resetInputHandler = () => {
    setConfirmed(false);
    setEnteredValue('');
  }

  const confirmInputHandler = () => {
    const chosenNumber = parseInt(enteredValue);
    if (chosenNumber === NaN || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert(
        'Invalid Numbers',
        'Number has to be between 1 and 99',
        [{ text: 'Okay', style: 'destructive', onPress: resetInputHandler }]
      )
      return;
    }
    setConfirmed(true);
    setEnteredValue('');
    setSelectedNumber(parseInt(enteredValue));
    Keyboard.dismiss();
  }

  let confirmedOutput;

  if (confirmed) {
    confirmedOutput = (
      <Card style={styles.summaryContainer}>
        <Text>You selected</Text>
        <NumberContainer>{selectedNumber}</NumberContainer>
        <MainButton onPress={() => props.onStartGame(selectedNumber)}>Start Game</MainButton>
      </Card>
    )
  }

  return (
    <TouchableWithoutFeedback onPress={() => {
      Keyboard.dismiss();
    }}>
      <View style={styles.screen}>
        <Text style={{ ...styles.title, ...defaultStyle.bodyText }}>Start a New Game!</Text>
        <Card style={styles.inputContainer}>
          <Text>Select a Number</Text>
          <Input 
            style={styles.input}
            keyboardType="number-pad" 
            maxLength={2}
            onChangeText={numberInputHandler}
            value={enteredValue}
          />
          <View style={styles.buttonContainer}>
            <View style={styles.button}>
              <Button title="Reset" color={colors.primary} onPress={resetInputHandler}/>
            </View>
            <View style={styles.button}>
              <Button title="Confirm" color={colors.primary} onPress={confirmInputHandler}/>
            </View>
          </View>
        </Card>
        {confirmedOutput}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    marginVertical: 10,
  },
  inputContainer: {
    width: 300,
    maxWidth: '80%',
    alignItems: 'center',
  },
  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  button: {
    width: 90,
  },
  input: {
    width: 150,
    textAlign: 'center'
  },
  summaryContainer: {
    width: 300,
    maxWidth: '80%',
    alignItems: 'center',
    marginTop: 20,
  }
});

export default GameStartScreen;
