import * as firebase from 'firebase';

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
    const path = `/user/${userId}/leafs`;

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
}
