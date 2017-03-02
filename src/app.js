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

import Colors from './config/colors';
import Firebase from "./firebase/firebase";
import TabIcon from './components/tab-icon';
import Profile from "./views/user/profile";
import LeafList from "./views/leaf/leaf-list";
import LeafDetail from "./views/leaf/leaf-detail";
import Login from "./views/auth/login";
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
      return (
        <Router style={{ backgroundColor: Colors.darkMain }}>
          <Scene key="root">

            <Scene key="auth" hideNavBar initial={false}>
              <Scene key="welcome" component={Welcome} title="Welcome" />
              <Scene key="registration" component={Registration} title="Registration" />
              <Scene key="login" component={Login} title="Login"/>
            </Scene>

            {/*this.state.initialView === 'account'*/}
            <Scene
              key="account"
              initial={true}
              tabs={true}
              tabBarStyle={{borderTopColor:'#00bb00',borderTopWidth:1,backgroundColor:'white'}}>

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
                  title="Profile"/>

                <Scene
                  key="feedback"
                  component={Form}
                  title="Leave a feedback"
                  rightTitle="SEND"
                  rightButtonTextStyle={{ color: Colors.greenMain }}
                  onRight={() => {
                    console.log('SEND');
                  }}/>

                <Scene
                  key="bug"
                  component={Form}
                  title="Report a bug"/>

              </Scene>
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
      backgroundColor: Colors.darkMain,
    },

    navBar: {
      backgroundColor: Colors.darkSub,
      borderBottomColor: Colors.greyMain
    },

    tintColor: {
      tintColor: Colors.greenMain
    },

    navText: {
      color: Colors.whiteMain,
    },

    tabBarStyle: {
      borderTopWidth: 1,
      borderColor: Colors.greyMain,
      backgroundColor: Colors.darkSub,
      opacity: 1
    }
  });