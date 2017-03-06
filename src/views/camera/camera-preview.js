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


export default class CameraPreview extends Component {
  constructor(props) {
    super(props);
    console.log(props);

    this.state = {};
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>photo preview</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 90,
    backgroundColor: '#070709'
  },
});