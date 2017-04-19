import React, { Component } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import * as firebase from 'firebase';
import Database from '../../firebase/database';

export default class LeafSelection extends Component {
  SIZE;

  constructor(props) {
    super(props);

    this.state = {
      isLoadingMain: true,
      results: props.results,
      isDbLoaded: false,
      user: {}
    };
  }


  componentWillMount() {
    this.SIZE = (Dimensions.get('window').width - 60) / 2;

    let user = firebase.auth().currentUser;
    this.setState({ user: user });

    try {
      Database.getTreeList((trees) => {
        this.state.results = this.state.results.map((item) => {
          let newItem = item;
          let res = trees.child(item.id).val();
          newItem.name = res.name;
          newItem.photos = res.photos;
          return newItem;
        });
        this.setState({ isDbLoaded: true });
      });
    } catch (error) {
      console.log(error);
    }
  }

  selectLeaf(leaf) {
    Database.saveAndGoToLeafDetail(this.state.user, this.props.userLeafPhoto, leaf);
  }

  render() {
    let leafItems = [];
    if (this.state.isDbLoaded) {
      leafItems = this.state.results.map((item) => {
        return (
          <TouchableOpacity
            key={item.id}
            onPress={() => {
              this.selectLeaf(item);
            }}>
            <View>
              <Text style={[styles.text, styles.textBold]}>{item.name}</Text>
              <Image
                style={[styles.image]}
                source={{ uri: item.photos[0] }}
              />
              <Text style={styles.text}>Prediction: {item.value * 100}%</Text>
            </View>
          </TouchableOpacity>
        );
      });
    }

    return (
      <View style={styles.container}>
        <ScrollView>

          <Text style={styles.h1}>We need your help with selection of a right leaf category.</Text>
          <Text style={styles.h2}>Please tap to right leaf photo.</Text>

          <View style={styles.itemBg}>
            <Image
              style={[styles.image, { width: 200, height: 200 }]}
              source={{ uri: this.props.userLeafPhoto }}
              onLoadEnd={() => {
                this.setState({ isLoadingMain: false });
              }}
            >
              <ActivityIndicator style={[styles.preloader, { height: 80 }]}
                                 size="large"
                                 color="#fff"
                                 animating={this.state.isLoadingMain}/>
            </Image>
            <Text style={styles.text}>Your photo</Text>
          </View>

          <View>
            <ScrollView horizontal style={styles.scrollView}>
              {leafItems}
            </ScrollView>
          </View>

        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#070709',
    paddingTop: 30
  },

  itemBg: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#15141a',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 15,
    marginVertical: 30,
  },

  itemsWrapper: {
    flex: 1,
    flexDirection: 'row'
  },

  scrollView: {
    padding: 10,
    backgroundColor: '#15141a',
    marginBottom: 30,
  },

  image: {
    borderRadius: 5,
    margin: 10,
    width: 200,
    height: 200
  },

  h1: {
    fontSize: 20,
    fontWeight: '500',
    marginTop: 10,
    marginBottom: 5,
    color: '#fff',
    textAlign: 'center'
  },

  h2: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#fff',
    textAlign: 'center'
  },

  text: {
    color: '#fff',
    textAlign: 'center'
  },

  textBold: {
    fontWeight: '500'
  },

  button: {
    height: 50,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
    opacity: 0.9,
    borderWidth: 0,
    alignSelf: 'stretch'
  },

  preloader: {
    marginTop: 60,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
