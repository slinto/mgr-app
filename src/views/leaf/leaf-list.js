import React, { Component } from 'react';
import {
  ActivityIndicator,
  Text,
  View,
  StyleSheet,
  ScrollView
} from 'react-native';
import * as firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import Database from '../../firebase/database';
import LeafItem from '../../components/leaf-item';

export default class LeafList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      uid: '',
      mobile: '',
      mobileForm: '',
      leafs: [],
      loading: false,
      loaded: false
    };
  }

  async componentDidMount() {
    try {
      this.setState({ loading: true });
      let user = await firebase.auth().currentUser;
      Database.getUserLeafList(user.uid, (leafs) => {
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

  goToDetail(leaf) {
    Actions.detail({ leaf: leaf, title: leaf.name });
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
    let leafItemsLength = Object.keys(this.state.leafs).length;

    return (
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={styles.container}>
        { this.state.loading &&
        <View style={{ flex: 1, justifyContent: 'center', marginTop: -50 }}>
          <ActivityIndicator
            animating={true}
            style={styles.preloader}
            size="large"
            color="#fff"
          />
          <Text style={styles.textLoadingH1}>Please wait!</Text>
          <Text style={styles.textLoadingH2}>We preparing your herbal list.</Text>
        </View>
        }

        { !this.state.loading && this.state.loaded && leafItemsLength === 0 &&
        <View>
          <Text style={styles.textBlank}>CAMERA LOGO / BUTTON</Text>
          <Text style={styles.textBlank}>ANALYZE YOUR FIRST LEAF</Text>
        </View>
        }
        {
          this.state.loaded && leafItemsLength > 0 &&
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

  textLoadingH1: {
    fontSize: 20,
    fontWeight: '500',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 5,
  },

  textLoadingH2: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontStyle: 'italic',
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

  preloader: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 50
  },
});
