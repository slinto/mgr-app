import {
  Image,
  Text,
  StyleSheet
} from 'react-native';
import React, { Component } from 'react';
import Colors from '../config/colors';

export default class OfflineView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Image
        source={require('../../assets/img/background.png')}
        style={styles.container}>
        <Text style={styles.h1}>No network connection!</Text>
        <Text style={styles.h2}>This app need a internet connection.</Text>
      </Image>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },

  h1: {
    fontSize: 20,
    fontWeight: '500',
    color: Colors.whiteMain,
    textAlign: 'center',
    marginBottom: 5,
  },

  h2: {
    color: Colors.whiteMain,
    textAlign: 'center',
    fontSize: 16,
    fontStyle: 'italic',
  }
});
