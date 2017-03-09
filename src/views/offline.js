import {
  Text,
  StyleSheet,
  View
} from 'react-native';
import React, { Component } from 'react';
import Colors from '../config/colors';

export default class OfflineView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.h1}>No network connection!</Text>
        <Text style={styles.h2}>This app need a internet connection.</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.darkMain
  },

  h1: {
    color: Colors.whiteMain,
    fontSize: 18
  },

  h2: {
    color: Colors.whiteMain
  }
});
