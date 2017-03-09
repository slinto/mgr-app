import React, {Component} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  Image,
  Text,
  View
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import RNFetchBlob from 'react-native-fetch-blob'
import firebase from 'firebase'
import Colors from '../../config/colors';
import FirebaseStorage from '../../firebase/storage';

export default class CameraWaiting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uploading: true,
      uploadedURL: ''
    };
  }

  componentWillMount() {
    FirebaseStorage.uploadImage(this.props.imgUri)
      .then(url => {
        this.setState({uploadedURL: url, uploading: false});
      })
      .catch(error => {
          console.log(error);
        }
      )
  }

  render() {
    return (
      <View style={styles.loadingContainer}>
        { this.state.uploading &&
        <View style={styles.loadingContainer}>
          <ActivityIndicator
            animating={this.state.uploading}
            style={styles.preloader}
            size="large"
            color="#000"
          />
          <Text style={styles.loadingH1}>Please wait!</Text>
          <Text style={styles.loadingH2}>We're analyze your leaf.</Text>
        </View>
        }

        { !this.state.uploading &&
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingH1}>DONE!</Text>
          <Text style={styles.loadingH2}>url: {this.state.uploadedURL}</Text>
          <Image source={{uri: this.state.uploadedURL}} style={{width: 300, height: 300}}/>
        </View>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.greenMain
  },

  loadingH1: {
    fontSize: 18,
    color: '#000',
    textAlign: 'center'
  },

  loadingH2: {
    color: '#000',
    textAlign: 'center'
  },

  preloader: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    height: 100
  },
});