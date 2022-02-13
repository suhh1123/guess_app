import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Dimensions } from 'react-native';
import MainButton from '../components/MainButton';
import Colors from '../constants/colors';
import defaultStyle from '../constants/default-style';

const GameOverScreen = props => {
  return (
    <View style={styles.screen}>
      <Text style={defaultStyle.bodyText}>The Game is Over!</Text>
      <View style={styles.imageContainer}>
        <Image 
          style={styles.image} 
          source={require('../assets/images/success.png')} 
          resizeMode="cover"
        /> 
      </View>
      <Text style={defaultStyle.bodyText}>Number of rounds: <Text style={styles.highlightText}>{props.roundsNumber}</Text></Text>
      <Text style={defaultStyle.bodyText}>Number was: <Text style={styles.highlightText}>{props.userNumber}</Text></Text>
      <MainButton onPress={props.onRestart}>New Game</MainButton>
    </View>
  )
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    width: Dimensions.get('window').width * 0.7,
    height: Dimensions.get('window').width * 0.7,
    borderRadius: Dimensions.get('window').width * 0.7 / 2,
    borderWidth: 1,
    borderColor: 'black',
    overflow: 'hidden',
    marginVertical: Dimensions.get('window').height / 30,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  highlightText: {
    color: Colors.primary,
  }
});

export default GameOverScreen;