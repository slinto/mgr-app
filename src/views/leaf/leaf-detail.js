/**
 * @class Home
 */

import React, {Component} from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView
} from "react-native";
import * as firebase from "firebase";

import Database from "../../firebase/database";
import Colors from '../../config/colors';
import LeafDetailItem from '../../components/leaf-detail-item';
import Gallery from '../../components/gallery';


export default class LeafDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tree: {},
      loading: false,
      loaded: false
    };

    console.log(this.props.leaf);

    // this.logout = this.logout.bind(this);
  }

  async componentDidMount() {
    try {
      this.setState({loading: true});
      Database.getTreeDetail(this.props.leaf.id, (tree) => {
        console.log(tree);

        this.setState({
          tree: tree,
          loaded: true,
          loading: false
        });
      });

    } catch (error) {
      console.log(error);
    }

  }

  render() {
    return (
      <ScrollView style={styles.container}>

        { this.state.loaded &&
        <View>
          <View style={styles.textWrapper}>
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

          <Gallery title='YOUR PHOTOS' photos={this.props.leaf.photos}/>

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

  textWrapper: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 20,
    backgroundColor: '#15141a',
  },
});