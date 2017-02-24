import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  TextInput,
  ScrollView,
  NativeModules
} from 'react-native';
const RNAppInfo = NativeModules.RNAppInfo;
import * as firebase from 'firebase';
import {Actions} from 'react-native-router-flux';
import {Button, ListItem} from 'react-native-elements';

import Database from '../firebase/database';

export default class Profile extends Component {

  constructor(props) {
    super(props);

    this.state = {
      uid: "",
      mobile: "",
      mobileForm: ""
    };

    this.logout = this.logout.bind(this);
    this.saveMobile = this.saveMobile.bind(this);
  }

  async componentDidMount() {
    try {
      let user = await firebase.auth().currentUser;

      Database.listenUserMobile(user.uid, (mobileNumber) => {
        this.setState({
          mobile: mobileNumber,
          mobileForm: mobileNumber
        });
      });

      this.setState({
        uid: user.uid
      });

    } catch (error) {
      console.log(error);
    }
  }

  async logout() {
    try {
      await firebase.auth().signOut();
      Actions.auth();
    } catch (error) {
      console.log(error);
    }
  }

  goToFeedback() {
    Actions.feedback({ msg: 'Write your message here...' });
  }

  goToBug() {
    Actions.bug({ msg: 'Write your bug here...' });
  }

  saveMobile() {
    if (this.state.uid && this.state.mobileForm) {
      Database.setUserMobile(this.state.uid, this.state.mobileForm);
    }
  }

  render() {
    return (
      <ScrollView style={styles.container}>

        <Text style={styles.divider}>USER</Text>

        <ListItem
          title='e-mail'
          rightTitle='hello@slinto.sk'
          hideChevron={true}
          containerStyle={styles.listItem}
          titleStyle={styles.listItemTitle}
          rightTitleStyle={styles.listItemRightTitle}
        />

        <ListItem
          title='e-mail'
          rightTitle='hello@slinto.sk'
          hideChevron={true}
          containerStyle={styles.listItem}
          titleStyle={styles.listItemTitle}
          rightTitleStyle={styles.listItemRightTitle}
        />

        <Text style={styles.divider}>APPLICATION</Text>

        <ListItem
          title='e-mail'
          rightTitle='hello@slinto.sk'
          hideChevron={true}
          containerStyle={styles.listItem}
          titleStyle={styles.listItemTitle}
          rightTitleStyle={styles.listItemRightTitle}
        />

        <ListItem
          title='Leave a feedback'
          containerStyle={[styles.listItem, styles.marginTop]}
          titleStyle={styles.listItemTitleGreen}
          chevronColor='#c2f3d3'
          onPress={this.goToFeedback}
        />

        <ListItem
          title='Report a bug'
          containerStyle={styles.listItem}
          titleStyle={styles.listItemTitleGreen}
          chevronColor='#c2f3d3'
          onPress={this.goToBug}
        />

        <ListItem
          title='Log out'
          containerStyle={[styles.listItem, styles.marginTop]}
          titleStyle={styles.listItemTitleGreen}
          chevronColor='#c2f3d3'
          onPress={this.logout}
        />

        <Text style={styles.version}>Version {RNAppInfo.shortVersion}</Text>

        {/* TODO: REMOVE THIS */}
        <Text style={styles.heading}>Hello UserId: {this.state.uid}</Text>
        <Text style={styles.heading}>Mobile Number (From Database): {this.state.mobile}</Text>
        <View style={styles.form}>
          <TextInput
            style={{height: 40, borderColor: 'gray', borderWidth: 1}}
            onChangeText={(mobileForm) => this.setState({mobileForm})}
            value={this.state.mobileForm}
            placeholder="Mobile Number"
          />

          <Button onPress={this.saveMobile} title="save"/>
        </View>

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    backgroundColor: '#070709'
  },

  heading: {
    textAlign: "center",
    color: '#fff'
  },

  logout: {
    padding: 50,
    backgroundColor: '#fff'
  },

  form: {
    padding: 50,
    backgroundColor: '#fff'
  },

  listItem: {
    backgroundColor: '#15141a',
    borderBottomColor: '#070709'
  },

  listItemTitle: {
    color: '#fff',
    marginLeft: 5
  },

  listItemTitleGreen: {
    color: '#c2f3d3',
    marginLeft: 5
  },

  listItemRightTitle: {
    color: '#c2f3d3',
    marginRight: 10
  },

  divider: {
    color: '#fff',
    fontSize: 13,
    marginTop: 30,
    marginLeft: 15,
    marginBottom: 5
  },

  marginTop: {
    marginTop: 30
  },

  version: {
    fontSize: 12,
    color: '#b1b1b3',
    marginTop: 15,
    marginLeft: 15
  }

});

