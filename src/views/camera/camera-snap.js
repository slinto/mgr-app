import React, { Component } from 'react';
import {
  Dimensions,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import Camera from 'react-native-camera';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ImagePicker from 'react-native-image-picker';
import Colors from '../../config/colors';

export default class CameraSnap extends Component {
  constructor(props) {
    super(props);

    this.state = {
      camera: {
        flashMode: Camera.constants.FlashMode.auto
      },
      isInfoTextVisible: true
    };
    this.camera;

    this.takePicture = this.takePicture.bind(this);
    this.goBack = this.goBack.bind(this);
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ isInfoTextVisible: false });
    }, 1500);
  }

  takePicture() {
    this.camera.capture()
      .then((data) => {
        Actions.cameraPreview({ imagePath: data.path });
      })
      .catch(err => console.error(err));
  }

  goBack() {
    Actions.leaf();
  }

  selectFromGallery() {
    ImagePicker.launchImageLibrary({}, (res) => {
      if (typeof res.uri !== 'undefined') {
        Actions.cameraPreview({ imagePath: res.uri });
      }
    });
  }

  switchFlash = () => {
    let newFlashMode;
    const { auto, on, off } = Camera.constants.FlashMode;

    if (this.state.camera.flashMode === auto) {
      newFlashMode = on;
    } else if (this.state.camera.flashMode === on) {
      newFlashMode = off;
    } else if (this.state.camera.flashMode === off) {
      newFlashMode = auto;
    }

    this.setState({
      camera: {
        ...this.state.camera,
        flashMode: newFlashMode,
      },
    });
  };

  get flashIconName() {
    let iconName;
    const { auto, on, off } = Camera.constants.FlashMode;

    if (this.state.camera.flashMode === auto) {
      iconName = 'flash-auto';
    } else if (this.state.camera.flashMode === on) {
      iconName = 'flash-on';
    } else if (this.state.camera.flashMode === off) {
      iconName = 'flash-off';
    }

    return iconName;
  }

  render() {
    return (
      <View style={styles.container}>
        <Camera
          defaultTouchToFocus
          ref={(cam) => {
            this.camera = cam;
          }}
          captureTarget={Camera.constants.CaptureTarget.temp}
          flashMode={this.state.camera.flashMode}
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill}>

          <View style={styles.controlsTopWrapper}>
            <TouchableOpacity
              style={styles.flashButtonWrapper}
              onPress={this.switchFlash}
            >
              <Icon
                style={styles.flashButton}
                name={this.flashIconName}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.cameraOverlayWrapper}>
            <Image
              source={require('../../../assets/img/camera-overlay.png')}
              style={styles.cameraOverlay}/>
            { this.state.isInfoTextVisible &&
            <Text style={styles.cameraOverlayText}>Please, hold leaf in this position.</Text>
            }
          </View>

          <View style={styles.controlsWrapper}>
            <TouchableOpacity>
              <Text style={styles.closeButton} onPress={this.goBack}>CLOSE</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.captureWrapper} onPress={this.takePicture}>
              <View style={styles.capture}/>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.galleryIconWrapper}
              onPress={this.selectFromGallery}
            >
              <Icon
                style={styles.galleryIcon}
                name='perm-media'
              />
            </TouchableOpacity>
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
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
  },

  cameraOverlayWrapper: {
    flex: 1,
  },

  cameraOverlay: {
    flex: 1,
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    opacity: 0.3
  },

  cameraOverlayText: {
    position: 'absolute',
    top: (Dimensions.get('window').height / 2) - 40,
    width: Dimensions.get('window').width,
    color: Colors.whiteMain,
    backgroundColor: 'transparent',
    textAlign: 'center',
    fontWeight: '500',
    opacity: 0.7
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
    marginBottom: 15,
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
  },

  galleryIconWrapper: {
    position: 'absolute',
    top: 15,
    right: -((Dimensions.get('window').width / 2) - 60),
    backgroundColor: 'transparent'
  },

  galleryIcon: {
    fontSize: 30,
    color: Colors.greenMain
  },

  controlsTopWrapper: {
    flex: 0
  },

  flashButtonWrapper: {
    position: 'absolute',
    top: 45,
    left: -((Dimensions.get('window').width / 2) - 30),
    backgroundColor: 'transparent'
  },

  flashButton: {
    fontSize: 30,
    color: Colors.greenMain
  }
});
