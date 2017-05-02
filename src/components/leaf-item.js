import React, { Component } from 'react';
import {
  Dimensions,
  Text,
  Image,
  View,
  StyleSheet,
  TouchableHighlight
} from 'react-native';

import Colors from '../config/colors';


export default class LeafItem extends React.Component {
  SIZE;

  componentWillMount() {
    this.SIZE = (Dimensions.get('window').width - 60) / 2;
  }

  getPhotoText(len) {
    if (len > 1) {
      return 'PHOTOS';
    } else {
      return 'PHOTO';
    }
  }

  getReadableName(id) {
    let name = id.replace('-',' ');
    return name.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  }

  render() {
    const leaf = this.props.data;
    return (
      <TouchableHighlight style={[styles.wrapper, { width: this.SIZE, height: this.SIZE }]}
                          onPress={this.props.onPress}>
        <Image style={[styles.image, { width: this.SIZE, height: this.SIZE }]} source={{ uri: leaf.photos[0].url }}>
          <View style={[styles.imageOverlay, { width: this.SIZE, height: this.SIZE }]}>
            <Text style={styles.heading}>{ this.getReadableName(leaf.id) }</Text>
            <Text style={styles.text}>{leaf.photos.length} { this.getPhotoText(leaf.photos.length) }</Text>
          </View>
        </Image>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    margin: 10,
    borderRadius: 5,
    backgroundColor: Colors.greyMain
  },

  image: {
    borderRadius: 5,
  },

  imageOverlay: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)'
  },

  heading: {
    color: Colors.whiteMain,
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 19,
    marginHorizontal: 10,
    marginBottom: 5
  },

  text: {
    color: Colors.whiteMain,
    textAlign: 'center',
    fontSize: 10,
    fontWeight: '500'
  }
});
