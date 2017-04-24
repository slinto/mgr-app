import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView
} from 'react-native';
import * as firebase from 'firebase';
import Database from '../../firebase/database';
import LeafDetailItem from '../../components/leaf-detail-item';
import Gallery from '../../components/gallery';
import Colors from '../../config/colors';


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
            leafPhotos: this.props.leaf.photos,
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
        <View style={styles.innerContainer}>
          <View style={styles.textWrapper}>
            <LeafDetailItem left="LATIN. NAME"
                            right={this.state.tree.latinName}/>

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

            <LeafDetailItem left="FLOWERING"
                            right={this.state.tree.flowering}/>

            <LeafDetailItem left="OCCURANCE"
                            right={this.state.tree.occurance}/>
          </View>

          <View style={styles.textWrapper}>
            <Text style={styles.textHeading}>DESCRIPTION</Text>
            <Text style={styles.textStyle}>{this.state.tree.description}</Text>
          </View>
          <Gallery title="YOUR PHOTOS" photos={this.state.leafPhotos}/>

          <Gallery title="TREE PHOTOS" photos={this.state.tree.treePhotos}/>
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
    backgroundColor: Colors.darkMain
  },

  innerContainer: {
    paddingBottom: 50,
  },

  textWrapper: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 30,
    backgroundColor: Colors.darkSub,
  },

  textHeading: {
    color: Colors.whiteMain,
    marginBottom: 5
  },

  textStyle: {
    color: Colors.greySub,
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'justify'
  },
});
