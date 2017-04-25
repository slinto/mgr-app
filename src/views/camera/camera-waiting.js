import React, { Component } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Image,
  Text,
  View
} from 'react-native';
import * as firebase from 'firebase';
import RNFetchBlob from 'react-native-fetch-blob';
import { Actions } from 'react-native-router-flux';
import Database from '../../firebase/database';
import Colors from '../../config/colors';
import Api from '../../config/api';
import FirebaseStorage from '../../firebase/storage';


export default class CameraWaiting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      processing: true,
      uploadedURL: '',
      user: {}
    };
  }

  async componentDidMount() {
    let user = await firebase.auth().currentUser;
    this.setState({ user: user });
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
    RNFetchBlob
      .config({
        timeout: 120000,
        indicator: true
      })
      .fetch('POST', `${Api.tensorflow.test}/photo-prediction`, {
        'Content-Type': 'multipart/form-data',
      }, [{ name: 'image_data', data: url }])
      .then((res) => res.json())
      .then((res) => {
        this.setState({ processing: false });
        this.analyzePredictionData(res);
      })
      .catch((error) => {
        console.log('TODO: HANDLE!!');
        console.log(error);
        Actions.leaf();
      });
  }


  analyzePredictionData(data) {
    const validResults = [];
    console.log('TF_ApiResults: ', data.results);

    data.results.forEach(item => {
      if (item.value >= 0.80) {
        validResults.push(item);
      }
    });
    console.log('TF_ValidResults: ', validResults);

    if (validResults.length === 1) {
      Database.saveAndGoToLeafDetail(this.state.user, this.state.uploadedURL, validResults[0]);
    } else if (validResults.length > 1) {
      Actions.leafSelection({ results: validResults, userLeafPhoto: this.state.uploadedURL });
    } else {
      Actions.leafUnknown();
    }
  }

  render() {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator
          animating
          style={styles.preloader}
          size="large"
          color="#000"
        />
        <Text style={styles.loadingH1}>Please wait!</Text>
        <Text style={styles.loadingH2}>We're analyzing your leaf.</Text>
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
    fontSize: 20,
    fontWeight: '500',
    marginTop: 10,
    marginBottom: 5,
    color: '#000',
    textAlign: 'center'
  },

  loadingH2: {
    fontSize: 16,
    marginBottom: 15,
    fontStyle: 'italic',
    color: '#000',
    textAlign: 'center'
  },

  preloader: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 50
  },
});
