import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  StatusBar
} from 'react-native';

import * as firebase from "firebase";
import {Scene, Router} from 'react-native-router-flux';

import Profile from "./views/profile";
import LeafList from "./views/leaf-list";
import LeafDetail from "./views/leaf-detail";
import Login from "./views/login";
import Firebase from "./firebase/firebase";

import TabIcon from './components/tab-icon';

export default class LeafMgrApp extends Component {
  constructor(props) {
    super(props);
    Firebase.initialise();
    this.getInitialView();
    this.state = {
      userLoaded: false,
      initialView: null
    };
    this.getInitialView = this.getInitialView.bind(this);
    StatusBar.setBarStyle('light-content', true);
  }

  getInitialView() {
    firebase.auth().onAuthStateChanged((user) => {
      let initialView = user ? "account" : "auth";
      console.log(user);

      this.setState({
        userLoaded: true,
        initialView: initialView
      })
    });
  }

  render() {
    if (this.state.userLoaded) {
      return (
        <Router>
          <Scene key="root">

            <Scene key="auth" hideNavBar initial={this.state.initialView === 'auth'}>
              <Scene key="login" component={Login} title="Login" initial={true}/>
            </Scene>

            {/*this.state.initialView === 'account'*/}
            <Scene
              key="account"
              initial={this.state.initialView === 'account'}
              tabs={true}
              tabBarStyle={styles.tabBarStyle}>

              <Scene
                key="leaf"
                initial={true}
                title="Leaf List"
                icon={TabIcon}
                navigationBarStyle={styles.navBar}
                titleStyle={styles.navText}
                backButtonTextStyle={styles.navText}
                barButtonIconStyle={styles.tintColor}
                rightButtonStyle={styles.navText}>
                <Scene key="list" component={LeafList} title="Leaf List" initial={true}/>
                <Scene key="detail" component={LeafDetail} title="Leaf Detail"/>
              </Scene>

              <Scene
                key="profile"
                component={Profile}
                title="Profile"
                icon={TabIcon}
                navigationBarStyle={styles.navBar}
                titleStyle={styles.navText}
                backButtonTextStyle={styles.navText}
                rightButtonStyle={styles.navText}/>
            </Scene>

          </Scene>
        </Router>
      );
    } else {
      return null;
    }
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
    },

    welcome: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
    },

    instructions: {
      textAlign: 'center',
      color: '#333333',
      marginBottom: 5,
    },

    navBar: {
      backgroundColor: '#15141a',
      borderBottomColor: '#48474d'
    },

    tintColor: {
      tintColor: '#c6efd1'
    },

    navText: {
      color: '#fff',
    },

    tabBarStyle: {
      borderTopWidth: .5,
      borderColor: '#48474d',
      backgroundColor: '#15141a',
      opacity: 1
    }
  })
  ;