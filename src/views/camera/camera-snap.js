import React, {Component} from 'react';
import {
  AppRegistry,
  Dimensions,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import Camera from 'react-native-camera';
import {Actions} from 'react-native-router-flux';
import Colors from '../../config/colors';


export default class CameraSnap extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.camera;

    this.takePicture = this.takePicture.bind(this);
    this.goBack = this.goBack.bind(this);
  }

  takePicture() {
    console.log('takePicture');
    this.camera.capture()
      .then((data) => {
        console.log(data)
        Actions.cameraPreview({ cameraData: data });
      })
      .catch(err => console.error(err));
  }

  goBack() {
    Actions.leaf();
  }

  render() {
    return (
      <View style={styles.container}>
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          captureTarget={Camera.constants.CaptureTarget.temp}
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill}>

          <View style={styles.controlsWrapper}>
            <Text style={styles.closeButton} onPress={this.goBack}>CLOSE</Text>

            <TouchableHighlight style={styles.captureWrapper} onPress={this.takePicture}>
              <View style={styles.capture} />
            </TouchableHighlight>
          </View>
        </Camera>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
  },

  controlsWrapper: {
    flex: 0,
  },

  captureWrapper: {
    flex: 0,
    backgroundColor: Colors.greenMain,
    width: 58,
    height: 58,
    borderRadius: 56,
    marginBottom: 30,
    paddingTop: 4,
    paddingLeft: 4
  },

  capture: {
    flex: 0,
    backgroundColor: Colors.greenMain,
    width: 50,
    height: 50,
    borderRadius: 50,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#000'
  },

  closeButton: {
    position: 'absolute',
    top: 20,
    left: -((Dimensions.get('window').width / 2) - 60),
    color: Colors.greenMain,
    fontSize: 16,
    backgroundColor: 'transparent'
  }

});