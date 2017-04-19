import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView
} from 'react-native';
import { Button } from 'react-native-elements';
import Colors from '../../config/colors';


export default class leafUnknown extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  goToHome() {

  }

  render() {
    return (
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={styles.container}>
        <View style={styles.textWrapper}>
          <Text style={styles.h1}>Sorry, we can't recognize your leaf.</Text>
          <Text style={styles.h2}>You can try analyze another photo or leaf.</Text>

          <Button
            title="Go to herbal list"
            onPress={this.goToHome}
            buttonStyle={styles.button}
            backgroundColor={Colors.greenMain}
            color={Colors.darkMain}
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#070709'
  },

  textWrapper: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 30,
    flex: 1,
    justifyContent: 'center',
  },

  h1: {
    fontSize: 20,
    fontWeight: '500',
    marginTop: 10,
    marginBottom: 5,
    color: '#fff',
    textAlign: 'center'
  },

  h2: {
    fontSize: 16,
    marginBottom: 15,
    fontStyle: 'italic',
    color: '#fff',
    textAlign: 'center'
  },

  button: {
    height: 50,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
    opacity: 0.9,
    borderWidth: 0,
    alignSelf: 'stretch'
  },
});
