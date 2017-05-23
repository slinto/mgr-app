import {
  Dimensions,
  View,
  StyleSheet,
  Image
} from 'react-native';
import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { Button } from 'react-native-elements';
import Colors from '../../config/colors';

export default class Welcome extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentWillMount() {
    this.imagePreload = (<Image source={require('../../../assets/img/background.png')}/>);
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

        <View style={styles.logoWrapper}>
          <Image style={styles.logo} source={require('../../../assets/img/logo.png')}/>
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
    backgroundColor: 'transparent',
    alignSelf: 'stretch',
    width: null,
  },

  logoWrapper: {
    alignItems: 'center'
  },

  logo: {
    marginTop: 30,
    marginBottom: 15
  },

  buttonsWrapper: {
    margin: 0
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
    alignSelf: 'stretch',
  }
});
