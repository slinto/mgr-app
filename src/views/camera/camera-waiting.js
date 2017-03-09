import React, {Component} from 'react';
import {
  Dimensions,
  StyleSheet,
  Image,
  Text,
  View
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Colors from '../../config/colors';


export default class CameraWaiting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uploading: true
    };
  }

  render() {
    alert(this.props.imgUri);
    return (
      <View>
        { this.state.uploading &&
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingH1}>Please wait!</Text>
          <Text style={styles.loadingH2}>We're analyze your leaf.</Text>
        </View>
        }

        { !this.state.uploading &&
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingH1}>DONE!</Text>
          <Text style={styles.loadingH2}>url:</Text>
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
  }
});