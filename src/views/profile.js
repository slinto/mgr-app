/**
 * @class Home
 */

import React, {Component} from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  TextInput
} from "react-native";

import * as firebase from "firebase";

import Button from "apsl-react-native-button";
// import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";

import Database from "../firebase/database";

export default class Profile extends Component {

  constructor(props) {
    super(props);

    this.state = {
      uid: "",
      mobile: "",
      mobileForm: ""
    };

    this.logout = this.logout.bind(this);
    this.saveMobile = this.saveMobile.bind(this);

  }

  async logout() {
    try {
      await firebase.auth().signOut();

      this.props.navigator.push({
        name: "Login"
      })
    } catch (error) {
      console.log(error);
    }
  }

  async componentDidMount() {
    try {
      // Get User Credentials
      let user = await firebase.auth().currentUser;

      // Listen for Mobile Changes
      Database.listenUserMobile(user.uid, (mobileNumber) => {
        this.setState({
          mobile: mobileNumber,
          mobileForm: mobileNumber
        });
      });

      this.setState({
        uid: user.uid
      });

    } catch (error) {
      console.log(error);
    }

  }

  saveMobile() {
    // Set Mobile
    if (this.state.uid && this.state.mobileForm) {
      Database.setUserMobile(this.state.uid, this.state.mobileForm);
    }
  }

  render() {
    return (
      <TouchableWithoutFeedback>
        <View style={styles.container}>
          <Text style={styles.heading}>Hello UserId: {this.state.uid}</Text>
          <Text style={styles.heading}>Mobile Number (From Database): {this.state.mobile}</Text>
          <View style={styles.form}>

            <TextInput
              style={{height: 40, borderColor: 'gray', borderWidth: 1}}
              onChangeText={(mobileForm) => this.setState({mobileForm})}
              value={this.state.mobileForm}
              placeholder="Mobile Number"
            />

            <Button onPress={this.saveMobile} textStyle={{fontSize: 18}}>
              Save
            </Button>
          </View>
          <View style={styles.logout}>
            <Button onPress={this.logout} textStyle={{fontSize: 18}}>
              Logout
            </Button>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 150
  },

  heading: {
    textAlign: "center"
  },

  logout: {
    padding: 50
  },

  form: {
    padding: 50
  }
});
