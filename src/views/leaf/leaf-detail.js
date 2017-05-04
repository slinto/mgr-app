import React, { Component } from 'react';
import {
  ActivityIndicator,
  Image,
  Text,
  View,
  StyleSheet,
  ScrollView
} from 'react-native';
import * as firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import Database from '../../firebase/database';
import LeafDetailItem from '../../components/leaf-detail-item';
import Gallery from '../../components/gallery';
import Colors from '../../config/colors';


export default class LeafDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tree: {},
      leafPhotos: [],
      treePhotos: [],
      loading: true,
      loaded: false,
      headerIsLoading: true,
      viewRef: null
    };
  }

  componentDidMount() {
    if (typeof this.props.leaf !== 'undefined') {
      try {
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
        let user = firebase.auth().currentUser;

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

  handleScroll = (event) => {
    if (this.state.loaded) {
      if (event.nativeEvent.contentOffset.y > 100) {
        Actions.refresh({ title: this.state.tree.latinName });
      } else {
        Actions.refresh({ title: '' });
      }
    }
  };

  render() {
    return (
      <ScrollView style={styles.container}
        // onScroll={this.handleScroll}
        // scrollEventThrottle={8}
      >
        { this.state.loaded &&
        <View style={styles.innerContainer}>

          <Image
            style={[styles.headerImage]}
            source={{ uri: (this.state.leafPhotos) ? this.state.leafPhotos[0].url : '' }}
            onLoadEnd={() => {
              this.setState({ headerIsLoading: false });
            }}>
            <View style={[styles.headerImageOverlay]}>
              <ActivityIndicator style={[styles.loader]}
                                 size="large"
                                 animating={this.state.headerIsLoading}/>
              { !this.state.headerIsLoading &&
                <Text style={styles.headerText}>{this.state.tree.latinName}</Text>
              }
            </View>
          </Image>

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
    )
      ;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    backgroundColor: Colors.darkMain
  },

  headerImage: {
    marginBottom: 40,
    height: 200,
  },

  headerImageOverlay: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },

  headerText: {
    color: Colors.whiteMain,
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 30,
    marginHorizontal: 10,
    marginBottom: 5
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

  loader: {
    position: 'absolute',
    top: 80,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
