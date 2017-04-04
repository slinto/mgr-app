import React, { Component } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Image,
  Text,
  View
} from 'react-native';
import RNFetchBlob from 'react-native-fetch-blob';
import Colors from '../../config/colors';
import Api from '../../config/api';
import FirebaseStorage from '../../firebase/storage';


export default class CameraWaiting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      processing: true,
      uploadedURL: ''
    };
  }

  componentWillMount() {
    FirebaseStorage.uploadImage(this.props.imgUri)
      .then(url => {
        this.setState({ uploadedURL: url });
        this.getPrediction(url);
      })
      .catch(error => {
        console.log(error);
      });
  }

  getPrediction(url) {
    RNFetchBlob.fetch('POST', `${Api.tensorflow}/photo-prediction-mock`, {
      'Content-Type': 'multipart/form-data'
    }, [{ name: 'image_data', data: url }])
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        this.setState({ processing: false });

        /**
         * TODO:
         *    1. Porovnanie hodnot v JSON API
         *    2. Podla kluca predkladat view:
         *          A) DETAIL STROMU (priradenie novej fotky z stromu v DB uzivatela)
         *          B) ROZHODNUTIE MEDZI STROMOM -> A)
         *          C) NIE JE V DB/ROZPOZNANY
         */

      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <View style={styles.loadingContainer}>
        { this.state.processing &&
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

        { !this.state.processing &&
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingH1}>DONE!</Text>
          <Text style={styles.loadingH2}>url: {this.state.uploadedURL}</Text>
          <Image source={{ uri: this.state.uploadedURL }} style={{ width: 300, height: 300 }}/>
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
