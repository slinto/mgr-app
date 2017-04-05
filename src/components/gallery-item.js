import React from 'react';
import {
  Image,
  StyleSheet,
  ActivityIndicator
} from 'react-native';
import Colors from '../config/colors';

export default class GalleryItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true
    };
  }

  render() {
    return (
      <Image key={this.props.photo.id}
             style={styles.image}
             source={{ uri: this.props.photo.url }}
             onLoadEnd={() => {
               this.setState({ isLoading: false });
             }}
      >
        <ActivityIndicator style={[styles.loader, { height: 80 }]}
                           animating={this.state.isLoading}/>
      </Image>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    borderRadius: 5,
    width: 125,
    height: 125,
    marginLeft: 10,
    marginRight: 10
  },

  loader: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
