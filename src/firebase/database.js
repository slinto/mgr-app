import * as firebase from 'firebase';
import { Actions, ActionConst } from 'react-native-router-flux';


export default class Database {

  /**
   * Sets a users mobile number
   * @param userId
   * @param mobile
   * @returns {firebase.Promise<any>|!firebase.Promise.<void>}
   */
  static setUserMobile(userId, mobile) {
    const userMobilePath = `/user/${userId}/details`;

    return firebase.database().ref(userMobilePath).set({ mobile });
  }

  /**
   * Listen for changes to a users mobile number
   * @param userId
   * @param callback Users mobile number
   */
  static listenUserMobile(userId, callback) {
    const userMobilePath = `/user/${userId}/details`;

    firebase.database().ref(userMobilePath).on('value', (snapshot) => {
      let mobile = '';
      if (snapshot.val()) {
        mobile = snapshot.val().mobile;
      }
      callback(mobile);
    });
  }

  //---------------------
  static getUserLeafList(userId, callback) {
    const path = `/user/${userId}/trees`;

    firebase.database().ref(path).on('value', (snapshot) => {
      callback(snapshot.val());
    });
  }

  //--------------------
  static getTreeDetail(leafId, callback) {
    const path = `/tree/${leafId}`;

    firebase.database().ref(path).on('value', (snapshot) => {
      callback(snapshot.val());
    });
  }

  //--------------------
  static getTreeList(callback) {
    const path = `/tree`;

    firebase.database().ref(path).on('value', (snapshot) => {
      callback(snapshot);
    });
  }

  //--------------------
  static saveAndGoToLeafDetail(user, photoURL, leaf) {
    let userLeafRef = `user/${user.uid}/trees/${leaf.id}`;

    // TODO: pridat GPS
    firebase.database().ref(userLeafRef).once('value').then((snapshot) => {
      let leafData = snapshot.val();
      let date = new Date();

      let newPhoto = {
        id: date.valueOf(),
        url: photoURL,
        date: date.toString(),
        gps: false
      }

      leafData.photos.unshift(newPhoto);

      firebase.database().ref(userLeafRef).set(leafData).then(() => {
        Database.getTreeDetail(leaf.id, (tree) => {
          Actions.detail({ tree: tree, title: tree.name, type: ActionConst.RESET });
        });
      });
    });
  }
}
