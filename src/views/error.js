import {
  Text,
  StyleSheet,
  View
} from 'react-native';
import React, { Component } from 'react';
import Colors from '../config/colors';

export default class ErrorView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props.errorMessage);

    return (
      <View style={styles.container}>
        <Text style={styles.h1}>Whooops 😞</Text>
        <Text style={styles.h2}>{ this.props.errorMessage }</Text>
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
