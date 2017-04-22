import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  ScrollView
} from 'react-native';
import * as firebase from 'firebase';
import Database from '../../firebase/database';
import LeafDetailItem from '../../components/leaf-detail-item';
import Gallery from '../../components/gallery';

export default class LeafDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tree: {},
      loading: true,
      loaded: false
    };
  }

  async componentDidMount() {
    if (typeof this.props.leaf !== 'undefined') {
      try {
        //this.setState({ loading: true });
        Database.getTreeDetail(this.props.leaf.id, (tree) => {
          this.setState({
            tree: tree,
            treePhotos: this.props.leaf.photos,
            loaded: true,
            loading: false
          });
        });

      } catch (error) {
        console.log(error);
      }
    } else if (typeof this.props.tree !== 'undefined') {
      try {
        let user = await firebase.auth().currentUser;

        Database.getUserLeafList(user.uid, (leafs) => {
          let userTreeData = leafs[`${this.props.tree.id}`];

          this.setState({
            tree: this.props.tree,
            treePhotos: userTreeData.photos,
            loaded: true,
            loading: false
          });
        });

      } catch (error) {
        console.log(error);
      }
    }
  }

  render() {
    return (
      <ScrollView style={styles.container}>

        { this.state.loaded &&
        <View>
          <View style={styles.textWrapper}>
            <LeafDetailItem left="LATIN. NAME"
                            right={this.state.tree.name}/>

            <LeafDetailItem left="NAME"
                            right={this.state.tree.name}/>

            <LeafDetailItem left="FAMILIA"
                            right={this.state.tree.familia}/>

            <LeafDetailItem left="TREE HEIGHT"
                            right={this.state.tree.treeHeight.value}
                            rightAddon={this.state.tree.treeHeight.unit}/>

            <LeafDetailItem left="LEAF SIZE"
                            right={this.state.tree.leafSize.value}
                            rightAddon={this.state.tree.leafSize.unit}/>

            <LeafDetailItem left="OCCURANCE"
                            right={this.state.tree.occurance}/>
          </View>
          <Gallery title='YOUR PHOTOS' photos={this.state.treePhotos}/>
        </View>
        }

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 90,
    backgroundColor: '#070709'
  },

  textWrapper: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 30,
    backgroundColor: '#15141a',
  },
});
