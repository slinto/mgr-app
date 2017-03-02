import {
  AppRegistry,
  TextInput,
  Text,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Image,
  ScrollView
} from "react-native";
import React, {Component} from "react";
import * as firebase from "firebase";
import {Actions} from 'react-native-router-flux';
import {Button} from 'react-native-elements';

import Colors from '../../config/colors';


export default class Welcome extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  goToLogin() {
    Actions.login();
  }

  goToRegistration() {
    Actions.registration();
  }

  render() {
    return (
      <Image
        source={require('../../../assets/img/background.png')}
        style={styles.container}>
        <ScrollView>
          <View style={styles.logoWrapper}>
            <Image style={styles.logo} source={require('../../../assets/img/logo.png')}/>
            <Text style={styles.h1}>
              LEAF PROJECT
            </Text>
            <Text style={styles.h2}>
              Learn nature.
            </Text>
          </View>

          <View style={styles.buttonsWrapper}>

            <Button
              buttonStyle={styles.button}
              backgroundColor={Colors.greySub}
              onPress={this.goToRegistration}
              title='Create an account'>
            </Button>

            <Button
              buttonStyle={styles.button}
              onPress={this.goToLogin}
              backgroundColor={Colors.greenSub}
              title='I have a account'>
            </Button>


          </View>
        </ScrollView>
      </Image>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'stretch',
    backgroundColor: 'transparent'
  },

  logoWrapper: {
    alignItems: 'center'
  },

  logo: {
    marginTop: 30,
    marginBottom: 15
  },

  h1: {
    fontSize: 25,
    fontWeight: '700',
    marginTop: 10,
    color: '#fff'
  },

  h2: {
    fontSize: 20,
    fontStyle: 'italic',
    color: '#fff'
  },

  button: {
    height: 50,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    opacity: 0.9,
    borderWidth: 0,
  },

  divider: {
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
    marginTop: 15
  },

  input: {
    color: 'rgba(255,255,255,0.8)',
    height: 50,
    borderColor: 'rgba(255,255,255,0.8)',
    borderWidth: 1,
    marginHorizontal: 15,
    borderRadius: 5,
    marginTop: 15,
    padding: 15
  },

  goBack: {
    color: Colors.whiteMain,
    marginTop: 20,
    textAlign: 'center'
  }
});
