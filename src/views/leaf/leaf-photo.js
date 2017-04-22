import React, { Component } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  View,
  StyleSheet
} from 'react-native';


export default class LeafPhoto extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Image key={this.props.photo.id}
               style={styles.image}
               source={{ uri: this.props.photo.url }}
               onLoadEnd={() => {
                 this.setState({ isLoading: false });
               }}
        >
          <ActivityIndicator style={[styles.loader, { height: 80 }]}
                             animating={this.state.isLoading} size="large"/>
        </Image>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    backgroundColor: '#070709'
  },

  image: {
    height: Dimensions.get('window').height
  },

  loader: {
    marginTop: (Dimensions.get('window').height / 2) - 60
  }
});
