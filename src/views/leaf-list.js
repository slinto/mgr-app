import React, {Component} from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  TextInput
} from "react-native";

import * as firebase from "firebase";
import {Actions} from 'react-native-router-flux';

import Database from "../firebase/database";

export default class LeafList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      uid: "",
      mobile: "",
      mobileForm: "",
      leafs: {},
      loading: false,
      loaded: true
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
      let user = await firebase.auth().currentUser;
      Database.getUserLeafList(user.uid, (leafs) => {
        console.log(leafs);

        this.setState({
          leafs: leafs
        });
      });

    } catch (error) {
      console.log(error);
    }

  }

  saveMobile() {
    if (this.state.uid && this.state.mobileForm) {
      Database.setUserMobile(this.state.uid, this.state.mobileForm);
    }
  }

  goToDetail(leaf) {
    Actions.detail({ leaf: leaf });
  }

  render() {
    let leafItems = Object.keys(this.state.leafs).map((key) => {
      if (this.state.leafs) {
        let leaf = this.state.leafs[key];
        return <Text key={key} onPress={() => { this.goToDetail(leaf) }}>{leaf.name}</Text>;
      }
    });

    return (
      <TouchableWithoutFeedback>
        <View style={styles.container}>
          {leafItems}

          <Text style={styles.textLoading}>LOADING...</Text>

          <Text style={styles.textBlank}>CAMERA LOGO / BUTTON</Text>
          <Text style={styles.textBlank}>ANALYZE YOUR FIRST LEAF</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 150,
    backgroundColor: '#070709'
  },

  textLoading: {
    color: '#fff',
    textAlign: 'center'
  },

  textBlank: {
    color: '#fff',
    textAlign: 'center'
  }
});