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
import {Actions, Scene, Router} from 'react-native-router-flux';

import Colors from './config/colors';
import Firebase from "./firebase/firebase";
import TabIcon from './components/tab-icon';
import Profile from "./views/user/profile";
import LeafList from "./views/leaf/leaf-list";
import LeafDetail from "./views/leaf/leaf-detail";
import Login from "./views/auth/login";
import PasswordReset from "./views/auth/password-reset";
import Welcome from "./views/auth/welcome";
import Registration from "./views/auth/registration";
import Form from "./views/user/form";

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

      let scenes = Actions.create(
        <Scene key="root" >

          <Scene key="auth" hideNavBar initial={this.state.initialView === 'auth'}>
            <Scene key="welcome" component={Welcome} title="Welcome" style={{ backgroundColor: Colors.darkMain}}/>
            <Scene key="registration" component={Registration} title="Registration" style={{ backgroundColor: Colors.darkMain}}/>
            <Scene key="login" component={Login} title="Login" style={{ backgroundColor: Colors.darkMain}}/>
            <Scene key="passwordReset" component={PasswordReset} title="Password Reset" style={{ backgroundColor: Colors.darkMain}}/>
          </Scene>

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
              <Scene key="list" component={LeafList} title="Leaf List" initial={true} style={{ backgroundColor: Colors.darkMain}}/>
              <Scene key="detail" component={LeafDetail} title="Leaf Detail" style={{ backgroundColor: Colors.darkMain}}/>
            </Scene>

            <Scene
              key="profile"
              title="Profile"
              icon={TabIcon}
              navigationBarStyle={styles.navBar}
              titleStyle={styles.navText}
              backButtonTextStyle={styles.navText}
              barButtonIconStyle={styles.tintColor}
              rightButtonStyle={styles.navText}>

              <Scene
                key="profile_detail"
                component={Profile}
                title="Profile"
                style={{ backgroundColor: Colors.darkMain}}/>

              <Scene
                key="feedback"
                component={Form}
                title="Leave a feedback"
                style={{ backgroundColor: Colors.darkMain}}/>

              <Scene
                key="bug"
                component={Form}
                style={{ backgroundColor: Colors.darkMain}}
                title="Report a bug"/>

            </Scene>
          </Scene>

        </Scene>
      );

      return (
        <Router scenes={scenes} />
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
    backgroundColor: Colors.darkMain,
  },

  navBar: {
    backgroundColor: Colors.darkSub,
    borderBottomWidth: 0
  },

  tintColor: {
    tintColor: Colors.greenMain
  },

  navText: {
    color: Colors.whiteMain,
  },

  tabBarStyle: {
    borderTopWidth: 0,
    backgroundColor: Colors.darkSub,
    opacity: 1
  }
});