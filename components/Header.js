import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import colors from '../constants/colors';

const height = Dimensions.get('screen').height;

const Header = props => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>{props.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: height / 10,
    paddingTop: 30,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    color: 'black',
    fontSize: 20,
  }
});

export default Header;