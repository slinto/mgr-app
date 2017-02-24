import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  TextInput,
  ScrollView,
  Dimensions
} from 'react-native';
import * as firebase from 'firebase';
import {Actions} from 'react-native-router-flux';

import Database from '../firebase/database';
import LeafItem from '../components/leaf-item';


export default class LeafList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      uid: "",
      mobile: "",
      mobileForm: "",
      leafs: [{
        id: 'prunus-selix',
        name: 'PRUNUS HOVNIS',
        photos: ['https://cdn.pixabay.com/photo/2015/08/27/13/59/leaf-910532_960_720.jpg']
      },
        {
          id: 'hovnus-selix',
          name: 'HOVNUS HOVNIS',
          photos: ['https://cdn.pixabay.com/photo/2015/08/27/13/59/leaf-910532_960_720.jpg']
        }],
      loading: false,
      loaded: false
    };
  }

  async componentDidMount() {
    try {
      this.setState({loading: true});
      let user = await firebase.auth().currentUser;
      Database.getUserLeafList(user.uid, (leafs) => {
        console.log(leafs);
        this.setState({
          leafs: leafs,
          loading: false,
          loaded: true
        });
      });
    } catch (error) {
      console.log(error);
    }
  }

  static goToDetail(leaf) {
    Actions.detail({leaf: leaf});
  }

  render() {
    let leafItems = Object.keys(this.state.leafs).map((key) => {
      if (this.state.leafs) {
        let leaf = this.state.leafs[key];
        return (
          <LeafItem key={leaf.name} data={leaf} onPress={() => {
            this.goToDetail(leaf)
          }}/>
        );
      }
    });

    return (
      <ScrollView style={styles.container}>
        { this.state.loading &&
        <Text style={styles.textLoading}>LOADING...</Text>
        }

        { !this.state.loading && this.state.loaded && this.state.leafs.length === 0 &&
        <View>
          <Text style={styles.textBlank}>CAMERA LOGO / BUTTON</Text>
          <Text style={styles.textBlank}>ANALYZE YOUR FIRST LEAF</Text>
        </View>
        }
        {
          /*this.state.loaded && */this.state.leafs.length > 0 &&
        <View style={styles.itemsWrapper}>
          {leafItems}
        </View>
        }
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    backgroundColor: '#070709'
  },

  textLoading: {
    color: '#fff',
    textAlign: 'center'
  },

  textBlank: {
    color: '#fff',
    textAlign: 'center'
  },

  itemsWrapper: {
    flex: 1,
    flexDirection: 'row',
    marginHorizontal: 10
  },

  leafItem: {}
});