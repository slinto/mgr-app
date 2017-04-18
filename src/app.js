import React, { Component } from 'react';
import {
  StyleSheet,
  StatusBar
} from 'react-native';

import * as firebase from 'firebase';
import { Actions, Scene, Router } from 'react-native-router-flux';

import Colors from './config/colors';
import Firebase from './firebase/firebase';
import TabIcon from './components/tab-icon';
import Profile from './views/user/profile';
import LeafList from './views/leaf/leaf-list';
import LeafDetail from './views/leaf/leaf-detail';
import LeafUnknown from './views/leaf/leaf-unknown';
import Login from './views/auth/login';
import PasswordReset from './views/auth/password-reset';
import Welcome from './views/auth/welcome';
import Registration from './views/auth/registration';
import Form from './views/user/form';
import CameraSnap from './views/camera/camera-snap';
import CameraPreview from './views/camera/camera-preview';
import CameraWaiting from './views/camera/camera-waiting';

export default class LeafMgrApp extends Component {
  constructor(props) {
    super(props);
    Firebase.initialize();
    StatusBar.setBarStyle('light-content', true);
    this.getInitialView();
    this.state = {
      userLoaded: false,
      initialView: null
    };

    this.getInitialView = this.getInitialView.bind(this);
  }

  getInitialView() {
    firebase.auth().onAuthStateChanged((user) => {
      const initialView = user ? 'account' : 'auth';

      this.setState({
        userLoaded: true,
        initialView
      });
    });
  }

  render() {
    if (this.state.userLoaded) {

      let scenes = Actions.create(
        <Scene key="root">

          <Scene key="auth" hideNavBar initial={this.state.initialView === 'auth'}>
            <Scene
              key="welcome"
              component={Welcome}
              title="Welcome"
              style={{ backgroundColor: Colors.darkMain }}
            />
            <Scene
              key="registration"
              component={Registration}
              title="Registration"
              style={{ backgroundColor: Colors.darkMain }}
            />
            <Scene
              key="login"
              component={Login}
              title="Login"
              style={{ backgroundColor: Colors.darkMain }}
            />
            <Scene
              key="passwordReset"
              component={PasswordReset}
              title="Password Reset"
              style={{ backgroundColor: Colors.darkMain }}
            />
          </Scene>

          <Scene
            key="account"
            initial={this.state.initialView === 'account'}
            tabs
            tabBarStyle={styles.tabBarStyle}
          >
            <Scene
              key="leaf"
              initial
              title="Herbarium"
              icon={TabIcon}
              navigationBarStyle={styles.navBar}
              titleStyle={styles.navText}
              backButtonTextStyle={styles.navText}
              barButtonIconStyle={styles.tintColor}
              rightButtonStyle={styles.navText}
            >
              <Scene
                key="list"
                component={LeafList}
                title="My Herbarium"
                initial
                style={{ backgroundColor: Colors.darkMain }}
              />
              <Scene
                key="detail"
                component={LeafDetail}
                title="Leaf Detail"
                style={{ backgroundColor: Colors.darkMain }}
              />
              <Scene
                key="leafUnknown"
                component={LeafUnknown}
                title="Unknown Leaf"
                style={{ backgroundColor: Colors.darkMain }}
              />
            </Scene>

            <Scene
              key="camera"
              title="Camera"
              icon={TabIcon}
              navigationBarStyle={styles.navBar}
              titleStyle={styles.navText}
              backButtonTextStyle={styles.navText}
              barButtonIconStyle={styles.tintColor}
              rightButtonStyle={styles.navText}
            >
              <Scene
                key="cameraSnap"
                component={CameraSnap}
                title="CameraSnap"
                hideNavBar
                hideTabBar
                initial
                style={{ backgroundColor: Colors.darkMain }}
              />
              <Scene
                key="cameraPreview"
                component={CameraPreview}
                title="Preview"
                style={{ backgroundColor: Colors.darkMain }}
              />
              <Scene
                key="cameraWaiting"
                component={CameraWaiting}
                title="Waiting"
                style={{ backgroundColor: Colors.greenMain }}
              />
            </Scene>

            <Scene
              key="profile"
              title="Profile"
              icon={TabIcon}
              navigationBarStyle={styles.navBar}
              titleStyle={styles.navText}
              backButtonTextStyle={styles.navText}
              barButtonIconStyle={styles.tintColor}
              rightButtonStyle={styles.navText}
            >
              <Scene
                key="profile_detail"
                component={Profile}
                title="Profile"
                style={{ backgroundColor: Colors.darkMain }}
              />
              <Scene
                key="feedback"
                component={Form}
                title="Leave a feedback"
                style={{ backgroundColor: Colors.darkMain }}
              />
              <Scene
                key="bug"
                component={Form}
                style={{ backgroundColor: Colors.darkMain }}
                title="Report a bug"
              />
            </Scene>
          </Scene>
        </Scene>
      );

      return (
        <Router scenes={scenes}/>
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
