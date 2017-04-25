import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
  View,
  ScrollView
} from 'react-native';
import * as firebase from 'firebase';
import DeviceInfo from 'react-native-device-info';
import { Actions } from 'react-native-router-flux';
import { ListItem } from 'react-native-elements';
import ReactNativeI18n from 'react-native-i18n';
import Colors from '../../config/colors';

const deviceLocale = ReactNativeI18n.currentLocale();


export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      uid: null,
      user: null
    };

    this.logout = this.logout.bind(this);
  }

  async componentDidMount() {
    try {
      let user = await firebase.auth().currentUser;

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

  goToFeedback = () => {
    Actions.feedback({ user: this.state.user, emailTitle: 'User feedback', msg: 'Write your message here...' });
  };

  goToBug = () => {
    Actions.bug({ user: this.state.user, emailTitle: 'Bug report', msg: 'Write your bug here...' });
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.innerContainer}>

          <Text style={styles.divider}>USER</Text>

          { this.state.user && this.state.user.providerData[0].providerId === 'password' &&
          <View>
            <ListItem
              title="E-mail"
              rightTitle={this.state.user.email}
              hideChevron={true}
              containerStyle={styles.listItem}
              titleStyle={styles.listItemTitle}
              rightTitleStyle={styles.listItemRightTitle}
            />

            <ListItem
              title="Password"
              rightTitle="****"
              hideChevron={true}
              containerStyle={styles.listItem}
              titleStyle={styles.listItemTitle}
              rightTitleStyle={styles.listItemRightTitle}
            />
          </View>
          }

          { this.state.user && this.state.user.providerData[0].providerId === 'facebook.com' &&
          <View>
            <ListItem
              title="Name"
              rightTitle={this.state.user.displayName}
              hideChevron={true}
              containerStyle={styles.listItem}
              titleStyle={styles.listItemTitle}
              rightTitleStyle={styles.listItemRightTitle}
            />
          </View>
          }

          {/*<Text style={styles.divider}>APPLICATION</Text>*/}

          {/*<ListItem*/}
            {/*title="Language"*/}
            {/*rightTitle={deviceLocale}*/}
            {/*chevronColor={Colors.greenMain}*/}
            {/*containerStyle={[styles.listItem, styles.rightWithChevron]}*/}
            {/*titleStyle={styles.listItemTitle}*/}
            {/*underlayColor={Colors.darkActive}*/}
            {/*rightTitleStyle={styles.listItemRightTitle}*/}
          {/*/>*/}

          <ListItem
            title="Leave a feedback"
            containerStyle={[styles.listItem, styles.marginTop]}
            titleStyle={styles.listItemTitleGreen}
            chevronColor={Colors.greenMain}
            underlayColor={Colors.darkActive}
            onPress={this.goToFeedback}
          />

          <ListItem
            title="Report a bug"
            containerStyle={styles.listItem}
            titleStyle={styles.listItemTitleGreen}
            chevronColor={Colors.greenMain}
            underlayColor={Colors.darkActive}
            onPress={this.goToBug}
          />

          <ListItem
            title="Log out"
            containerStyle={[styles.listItem, styles.marginTop]}
            titleStyle={styles.listItemTitleGreen}
            chevronColor={Colors.greenMain}
            underlayColor={Colors.darkActive}
            onPress={this.logout}
          />

          <Text style={styles.version}>Version {DeviceInfo.getVersion()}</Text>
        </View>
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

  innerContainer: {
    paddingBottom: 50,
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
