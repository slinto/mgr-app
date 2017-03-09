import React from 'react';
import {
  Text,
  View,
  StyleSheet
} from 'react-native';

import Colors from '../config/colors';

export default class LeafDetailItem extends React.Component {
  render() {
    let rightValue = this.props.right;
    if (Array.isArray(this.props.right)) {
      rightValue = this.props.right.map((val, index) => {
        return (index > 0) ? `, ${val}` : val;
      });
    }

    return (
      <View style={styles.wrapper}>
        <Text style={styles.left}>{this.props.left}</Text>
        <Text style={styles.right}>{rightValue} {this.props.rightAddon}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: '#27262e',
    borderBottomWidth: 1,
    marginTop: 5,
    marginBottom: 5
  },

  left: {
    color: Colors.whiteMain,
  },

  right: {
    color: Colors.whiteMain,
    textAlign: 'right'
  }
});
