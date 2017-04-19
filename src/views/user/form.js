import {
  ActivityIndicator,
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


const Fetch = RNFetchBlob.polyfill.Fetch
// replace built-in fetch
window.fetch = new Fetch({
  // enable this option so that the response data conversion handled automatically
  auto: true,
  // when receiving response data, the module will match its Content-Type header
  // with strings in this array. If it contains any one of string in this array,
  // the response body will be considered as binary data and the data will be stored
  // in file system instead of in memory.
  // By default, it only store response data to file system when Content-Type
  // contains string `application/octet`.
  binaryContentTypes: [
    'image/',
    'video/',
    'audio/',
    'foo/',
  ]
}).build()

export default class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      response: '',
      sending: false
    };
    this.sendEmail = this.sendEmail.bind(this);
  }

  sendEmail() {
    this.setState({ sending: true });

    fetch(`${Api.server.test}/send-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: this.props.user.email,
        id: this.props.user.uid,
        subject: `LeafProject: ${this.props.emailTitle}`,
        message: this.state.text
      })
    })
      .then((res) => res.json())
      .then(res => {
        this.setState({
          response: 'Thank you, for your feedback!',
          sending: false
        });

        setTimeout(() => {
          Actions.pop();
        }, 1500);
      })
      .catch((error) => {
        console.log(error);
      });
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

        { !this.state.sending && this.state.response === '' &&
        <Button
          title="SEND"
          onPress={this.sendEmail}
          buttonStyle={styles.button}
          backgroundColor={Colors.greenMain}
          color={Colors.darkMain}
        />
        }

        { this.state.sending &&
        <ActivityIndicator
          animating
          style={styles.preloader}
          size="large"
          color="#fff"
        />
        }

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
  },

  preloader: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 50
  },
});
