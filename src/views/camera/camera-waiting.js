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
    let user = await
    firebase.auth().currentUser;
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
    RNFetchBlob.fetch('POST', `${Api.tensorflow}/photo-prediction-mock`, {
      'Content-Type': 'multipart/form-data'
    }, [{ name: 'image_data', data: url }])
      .then((res) => res.json())
      .then((res) => {
        this.setState({ processing: false });
        this.analyzePredictionData(res);
      })
      .catch((error) => {
        console.log(error);
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
      let userLeafRef = `user/${this.state.user.uid}/trees/${validResults[0].id}`;

      // TODO: pridat GPS
      firebase.database().ref(userLeafRef).once('value').then((snapshot) => {
        let leafData = snapshot.val();
        let date = new Date();

        let newPhoto = {
          id: date.valueOf(),
          url: this.state.uploadedURL,
          date: date.toString(),
          gps: false
        }

        leafData.photos.unshift(newPhoto);

        firebase.database().ref(userLeafRef).set(leafData).then(() => {
          Database.getTreeDetail(validResults[0].id, (tree) => {
            Actions.detail({ tree: tree, title: tree.name });
          });
        });
      });
    } else if (validResults > 1) {

    } else {

    }
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
