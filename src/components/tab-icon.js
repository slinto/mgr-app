import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet
} from 'react-native';

import Icon from 'react-native-vector-icons/SimpleLineIcons';

export default class TabIcon extends React.Component {

  getIconName() {
    if (this.props.name === 'leaf') {
      return 'list';
    } else if (this.props.name === 'profile') {
      return 'user';
    }
  }

  render() {
    return (
      <View>
        <Icon name={this.getIconName()} style={[styles.icon, {color: this.props.selected ? '#c6efd1' : '#454454'}]} />
        <Text style={[styles.text, {color: this.props.selected ? '#c6efd1' : '#454454'}]}>
          {this.props.title}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  icon: {
    fontSize: 18,
    textAlign: 'center',
    paddingBottom: 3
  },
  text: {
    fontSize: 12,
    textAlign: 'center'
  }
});