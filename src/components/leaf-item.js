import React, {Component} from 'react';
import {
  Text,
  Image,
  View,
  StyleSheet,
  TouchableHighlight,
  Dimensions
} from 'react-native';


export default class LeafItem extends React.Component {
  SIZE;

  componentWillMount() {
    this.SIZE = (Dimensions.get('window').width - 60) / 2;
  }

  render() {
    const leaf = this.props.data;
    return (
      <TouchableHighlight style={[styles.wrapper, {width: this.SIZE, height: this.SIZE}]} onPress={this.props.onPress}>
        <Image style={[styles.image, {width: this.SIZE, height: this.SIZE}]} source={{uri: leaf.photos[0]}}>
          <View style={[styles.imageOverlay, {width: this.SIZE, height: this.SIZE}]}>
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
    borderRadius: 5,
    backgroundColor: '#4CBC70'
  },
  image: {
    borderRadius: 5,
  },
  imageOverlay: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)'
  },
  heading: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 18,
    marginHorizontal: 10
  },
  text: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 11
  }
});