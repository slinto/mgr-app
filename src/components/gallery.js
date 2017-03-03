import React, {Component} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';

import Colors from '../config/colors';

export default class Gallery extends React.Component {

  render() {
    let images = this.props.photos.map((photoUri) => {
      // TODO: KEY
      return <Image key={Math.random()} style={styles.image} source={{uri: photoUri}}/>
    });

    return (
      <View style={styles.wrapper}>
        <Text style={styles.title}>{this.props.title}</Text>
        <ScrollView horizontal={true} style={styles.scrollView}>
          {images}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    paddingVertical: 10,
    //paddingHorizontal: 20,
    backgroundColor: '#15141a',
  },
  scrollView: {
    paddingTop: 10
  },
  title: {
    color: Colors.whiteMain,
    fontSize: 13,
    marginHorizontal: 20
  },
  right: {
    color: Colors.whiteMain,
    textAlign: 'right'
  },
  image: {
    borderRadius: 5,
    width: 125,
    height: 125,
    marginLeft: 20
  },
});