import {
  Text,
  StyleSheet,
  ScrollView,
  TextInput
} from 'react-native';
import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { Button } from 'react-native-elements';
import RNFetchBlob from 'react-native-fetch-blob';
import Colors from '../../config/colors';
import Api from '../../config/api';


export default class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      response: ''
    };

    this.sendEmail = this.sendEmail.bind(this);
  }

  sendEmail() {
    this.setState({
      response: 'Thank you, for your feedback!'
    });

    // TODO
    RNFetchBlob.fetch('POST', `${Api.server.test}/send-email`, {
      'Content-Type': 'multipart/form-data'
    }, [{ email: 'TODO', subject: 'TODO', text: 'TODO' }])
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        Actions.pop();
      })
      .catch((error) => {
        console.log(error);
      });

    // setTimeout(() => {
    //   Actions.pop();
    // }, 1500);
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <TextInput
          style={styles.textInput}
          multiline
          editable
          placeholder={this.props.msg}
          placeholderTextColor={Colors.greySub}
          onChangeText={(text) => this.setState({ text })}
          value={this.state.text}
        />

        <Button
          title="SEND"
          onPress={this.sendEmail}
          buttonStyle={styles.button}
          backgroundColor={Colors.greenMain}
          color={Colors.darkMain}
        />

        <Text style={styles.response}>{this.state.response}</Text>

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 65,
    backgroundColor: Colors.darkMain
  },

  textInput: {
    height: 200,
    backgroundColor: Colors.darkSub,
    color: Colors.whiteMain,
    fontSize: 15,
    padding: 15,
    margin: 15,
    borderRadius: 5
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

  response: {
    color: Colors.greenMain,
    marginTop: 20,
    textAlign: 'center',
    fontWeight: '500'
  }
});
