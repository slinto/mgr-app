import React from 'react';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import Colors from '../config/colors';
import { Actions } from 'react-native-router-flux';

export default class GalleryItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true
    };
  }

  openPhoto(photo) {
    Actions.leafPhoto({ photo });
  }

  render() {
    return (
      <TouchableOpacity
        onPress={() => {
          this.openPhoto(this.props.photo);
        }}>
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
      </TouchableOpacity>
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
