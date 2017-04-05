import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
  ScrollView,
  NativeModules
} from 'react-native';
import * as firebase from 'firebase';
import DeviceInfo from 'react-native-device-info';
import { Actions } from 'react-native-router-flux';
import { ListItem } from 'react-native-elements';
import ReactNativeI18n from 'react-native-i18n';
import Database from '../../firebase/database';
import Colors from '../../config/colors';

const deviceLocale = ReactNativeI18n.currentLocale();

export default class Profile extends Component {

  constructor(props) {
    super(props);

    this.state = {
      uid: "",
      user: '',
      mobile: "",
      mobileForm: ""
    };

    this.logout = this.logout.bind(this);
    this.saveMobile = this.saveMobile.bind(this);
  }

  async componentDidMount() {
    try {
      let user = await firebase.auth().currentUser;
      //
      // Database.listenUserMobile(user.uid, (mobileNumber) => {
      //   this.setState({
      //     mobile: mobileNumber,
      //     mobileForm: mobileNumber
      //   });
      // });

      this.setState({
        uid: user.uid,
        user: user
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
          title='E-mail'
          rightTitle={this.state.user.email}
          hideChevron={true}
          containerStyle={styles.listItem}
          titleStyle={styles.listItemTitle}
          rightTitleStyle={styles.listItemRightTitle}
        />

        <ListItem
          title='Password'
          rightTitle='****'
          hideChevron={true}
          containerStyle={styles.listItem}
          titleStyle={styles.listItemTitle}
          rightTitleStyle={styles.listItemRightTitle}
        />

        <Text style={styles.divider}>APPLICATION</Text>

        <ListItem
          title='Language'
          rightTitle={deviceLocale}
          chevronColor={Colors.greenMain}
          containerStyle={[styles.listItem, styles.rightWithChevron]}
          titleStyle={styles.listItemTitle}
          underlayColor={Colors.darkActive}
          rightTitleStyle={styles.listItemRightTitle}
        />

        <ListItem
          title='Leave a feedback'
          containerStyle={[styles.listItem, styles.marginTop]}
          titleStyle={styles.listItemTitleGreen}
          chevronColor={Colors.greenMain}
          underlayColor={Colors.darkActive}
          onPress={this.goToFeedback}
        />

        <ListItem
          title='Report a bug'
          containerStyle={styles.listItem}
          titleStyle={styles.listItemTitleGreen}
          chevronColor={Colors.greenMain}
          underlayColor={Colors.darkActive}
          onPress={this.goToBug}
        />

        <ListItem
          title='Log out'
          containerStyle={[styles.listItem, styles.marginTop]}
          titleStyle={styles.listItemTitleGreen}
          chevronColor={Colors.greenMain}
          underlayColor={Colors.darkActive}
          onPress={this.logout}
        />

        <Text style={styles.version}>Version {DeviceInfo.getVersion()}</Text>

        {/* TODO: REMOVE THIS */}
        {/*<Text style={styles.heading}>Hello UserId: {this.state.uid}</Text>*/}
        {/*<Text style={styles.heading}>Mobile Number (From Database): {this.state.mobile}</Text>*/}
        {/*<View style={styles.form}>*/}
        {/*<TextInput*/}
        {/*style={{height: 40, borderColor: 'gray', borderWidth: 1}}*/}
        {/*onChangeText={(mobileForm) => this.setState({mobileForm})}*/}
        {/*value={this.state.mobileForm}*/}
        {/*placeholder="Mobile Number"*/}
        {/*/>*/}

        {/*<Button onPress={this.saveMobile} title="save"/>*/}
        {/*</View>*/}

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 60,
    backgroundColor: Colors.darkMain
  },

  heading: {
    textAlign: 'center',
    color: Colors.whiteMain
  },

  logout: {
    padding: 50,
    backgroundColor: Colors.whiteMain
  },

  form: {
    padding: 50,
    backgroundColor: Colors.whiteMain
  },

  listItem: {
    backgroundColor: Colors.darkSub,
    borderBottomColor: Colors.darkMain
  },

  listItemTitle: {
    color: Colors.whiteMain,
    marginLeft: 5
  },

  listItemTitleGreen: {
    color: Colors.greenMain,
    marginLeft: 5
  },

  listItemRightTitle: {
    color: Colors.greenMain,
    marginRight: 10
  },

  divider: {
    color: Colors.whiteMain,
    fontSize: 13,
    marginTop: 30,
    marginLeft: 15,
    marginBottom: 5
  },

  marginTop: {
    marginTop: 30
  },

  rightWithChevron: {
    paddingRight: 12
  },

  version: {
    fontSize: 12,
    color: Colors.greySub,
    marginTop: 15,
    marginLeft: 15
  }
});
