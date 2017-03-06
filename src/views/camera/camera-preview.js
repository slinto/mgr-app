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


export default class CameraPreview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };

    this.goBack = this.goBack.bind(this);
    this.sendToAnalyze = this.sendToAnalyze.bind(this);
  }

  goBack() {
    Actions.pop();
  }

  sendToAnalyze() {
    this.setState({
      loading: true
    });
  }

  render() {
    return (
      <View style={styles.container}>

        { !this.state.loading &&
        <Image source={{uri: this.props.cameraData.path}} style={styles.image}>
          <View style={styles.buttonsWrapper}>
            <Text style={styles.button} onPress={this.goBack}>RETAKE</Text>
            <Text style={styles.button} onPress={this.sendToAnalyze}>ANALYZE!</Text>
          </View>
        </Image>
        }

        { this.state.loading &&
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingH1}>Please wait!</Text>
          <Text style={styles.loadingH2}>We're analyze your leaf.</Text>
        </View>
        }

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
  },

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