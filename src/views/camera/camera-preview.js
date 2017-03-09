import React, { Component } from 'react';
import {
  Dimensions,
  StyleSheet,
  Image,
  Text,
  View
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Colors from '../../config/colors';

export default class CameraPreview extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.goBack = this.goBack.bind(this);
    this.sendToAnalyze = this.sendToAnalyze.bind(this);
  }

  goBack() {
    Actions.pop();
  }

  sendToAnalyze() {
    Actions.cameraWaiting({ imgUri: this.props.cameraData.path });
  }

  render() {
    return (
      <View style={styles.container}>
        <Image source={{ uri: this.props.cameraData.path }} style={styles.image}>
          <View style={styles.buttonsWrapper}>
            <Text style={styles.button} onPress={this.goBack}>RETAKE</Text>
            <Text style={styles.button} onPress={this.sendToAnalyze}>ANALYZE!</Text>
          </View>
        </Image>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#070709'
  },

  image: {
    flex: 1,
    height: Dimensions.get('window').height,
    resizeMode: 'contain',
  },

  buttonsWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginHorizontal: 20,
    marginBottom: 20
  },

  button: {
    color: Colors.greenMain,
    fontSize: 16,
    backgroundColor: 'transparent'
  }
});