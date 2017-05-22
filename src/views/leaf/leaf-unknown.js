import React, { Component } from 'react';
import {
  Image,
  View,
  Text,
  StyleSheet,
  ScrollView
} from 'react-native';
import { Button } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import Database from '../../firebase/database';
import Colors from '../../config/colors';


export default class LeafUnknown extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    Database.saveUnknownPhotoUrl(this.props.userUID, this.props.userLeafPhoto);
    Database.increaseUserPoint(this.props.userUID, 'contributor');
  }

  goToHome() {
    Actions.leaf();
  }

  render() {
    return (
      <Image
        source={require('../../../assets/img/background.png')}
        style={styles.background}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={styles.container}>
          <View style={styles.textWrapper}>
            <Text style={styles.h1}>Sorry, we can't recognize your leaf.</Text>
            <Text style={styles.h2}>You can try analyze another photo or leaf.</Text>

            <Text style={styles.h3}>🎉 Your CONTRIBUTOR point is +1 🎉</Text>
            <Text style={styles.h4}>When You analyze unknown leaf, You help us to build bigger database. Your
              CONTRIBUTOR
              points is increasing with every unknown photo.</Text>

            <Button
              title="Go to my herbarium"
              onPress={this.goToHome}
              buttonStyle={styles.button}
              backgroundColor={Colors.greenMain}
              color={Colors.darkMain}
            />
          </View>
        </ScrollView>
      </Image>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },

  container: {
    backgroundColor: 'transparent'
  },

  textWrapper: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 30,
    flex: 1,
    justifyContent: 'center',
  },

  h1: {
    fontSize: 20,
    fontWeight: '500',
    marginTop: 10,
    marginBottom: 5,
    color: Colors.whiteMain,
    textAlign: 'center'
  },

  h2: {
    fontSize: 16,
    marginBottom: 15,
    fontStyle: 'italic',
    color: Colors.whiteMain,
    textAlign: 'center'
  },

  h3: {
    fontSize: 14,
    marginTop: 15,
    marginBottom: 15,
    color: Colors.greenMain,
    textAlign: 'center'
  },

  h4: {
    fontSize: 14,
    marginTop: 15,
    marginBottom: 30,
    fontStyle: 'italic',
    color: Colors.greenMain,
    textAlign: 'center'
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
});
