import React, { Component } from 'react';
import {
  Text,
  Image,
  View,
  StyleSheet,
  TouchableHighlight,
  Dimensions
} from 'react-native';

import Colors from '../config/colors';

export default class LeafItem extends React.Component {
  SIZE;

  componentWillMount() {
    this.SIZE = (Dimensions.get('window').width - 60) / 2;
  }

  render() {
    const leaf = this.props.data;
    return (
      <TouchableHighlight style={[styles.wrapper, { width: this.SIZE, height: this.SIZE }]}
                          onPress={this.props.onPress}>
        <Image style={[styles.image, { width: this.SIZE, height: this.SIZE }]} source={{ uri: leaf.photos[0].url }}>
          <View style={[styles.imageOverlay, { width: this.SIZE, height: this.SIZE }]}>
            <Text style={styles.heading}>{leaf.name}</Text>
            <Text style={styles.text}>{leaf.photos.length} PHOTOS</Text>
          </View>
        </Image>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    margin: 10,
    borderRadius: 5
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
