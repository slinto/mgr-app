/**
 * @class Login
 */

import {
  AppRegistry,
  TextInput,
  Text,
  View,
  StyleSheet,
  TouchableWithoutFeedback
} from "react-native";
import React, {Component} from "react";

import * as firebase from "firebase";
import { Actions } from 'react-native-router-flux';

import Button from "apsl-react-native-button";
// import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "hello@slinto.sk",
      password: "Tomco313",
      response: ""
    };

    this.signup = this.signup.bind(this);
    this.login = this.login.bind(this);
  }

  async signup() {
    try {
      await firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password);

      this.setState({
        response: "account created"
      });

      setTimeout(() => {
        // this.props.navigator.push({
        //   name: "Home"
        // })
        Actions.account();
      }, 1500);

    } catch (error) {
      this.setState({
        response: error.toString()
      })
    }
  }

  async login() {
    try {
      await firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password);

      this.setState({
        response: "Logged In!"
      });

      setTimeout(() => {
        Actions.account();
        // this.props.navigator.push({
        //   name: "Home"
        // })
      }, 1500);

    } catch (error) {
      this.setState({
        response: error.toString()
      })
    }

  }

  render() {
    return (
      <TouchableWithoutFeedback>
        <View>
          <View style={styles.formGroup}>
            <Text style={styles.title}>Leaf Project</Text>

            <TextInput
              style={{height: 40, borderColor: 'gray', borderWidth: 1}}
              onChangeText={(email) => this.setState({email})}
              value={this.state.email}
              placeholder="email"
            />

            <TextInput
              style={{height: 40, borderColor: 'gray', borderWidth: 1}}
              onChangeText={(password) => this.setState({password})}
              value={this.state.password}
              placeholder="password"
              secureTextEntry={true}
            />

            <View style={styles.submit}>
              <Button onPress={this.signup} textStyle={{fontSize: 18}}>
                Sign up
              </Button>
              <Button onPress={this.login} textStyle={{fontSize: 18}}>
                Login
              </Button>
            </View>
          </View>
          <View>
            <Text style={styles.response}>{this.state.response}</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  formGroup: {
    padding: 50
  },

  title: {
    paddingBottom: 16,
    textAlign: "center",
    color: "#000",
    fontSize: 35,
    fontWeight: "bold",
    opacity: 0.8,
  },

  submit: {
    paddingTop: 30
  },

  response: {
    textAlign: "center",
    paddingTop: 0,
    padding: 50
  }
});
