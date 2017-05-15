import * as firebase from 'firebase';
import { Actions } from 'react-native-router-flux';


export default class Database {

  static getUserLeafList(userId, callback) {
    const ref = `/user/${userId}/trees`;

    firebase.database().ref(ref).orderByChild('updated').on('value', (snapshot) => {
      let leafs = [];
      snapshot.forEach((child) => {
        leafs.unshift(child.val());
      });

      callback(leafs);
    });
  }

  static getTreeDetail(leafId, callback) {
    const ref = `/tree/${leafId}`;

    firebase.database().ref(ref).on('value', (snapshot) => {
      callback(snapshot.val());
    });
  }

  static getTreeList(callback) {
    const ref = '/tree';

    firebase.database().ref(ref).on('value', (snapshot) => {
      callback(snapshot);
    });
  }

  static saveAndGoToLeafDetail(user, photoURL, leaf) {
    let ref = `user/${user.uid}/trees/${leaf.id}`;

    // TODO: pridat GPS
    firebase.database().ref(ref).once('value').then((snapshot) => {
      let leafData = snapshot.val();
      let date = new Date();

      if (leafData === null) {
        leafData = {
          id: leaf.id,
          photos: []
        };
      }

      let newPhoto = {
        id: date.valueOf(),
        url: photoURL,
        date: date.toString(),
        gps: false
      };

      leafData.photos.unshift(newPhoto);
      leafData.updated = date.toString();

      firebase.database().ref(ref).set(leafData).then(() => {
        Database.getTreeDetail(leaf.id, (tree) => {
          Actions.detail({ tree: tree, leaf: leafData, title: tree.latinName });
        });
      });
    });
  }

  static savePredictionLog(predictionData, user, url) {
    let ref = 'predictionLog';

    let log = {
      date: new Date().toString(),
      user: user.uid,
      url: url,
      results: predictionData
    };

    firebase.database().ref(ref).push().set(log);
  }

  static saveUnknownPhotoUrl(userUID, url) {
    let ref = 'unknownPhoto';

    let photo = {
      date: new Date().toString(),
      user: userUID,
      url
    };

    firebase.database().ref(ref).push().set(photo);
  }

  static increaseUserPoint(userUID, pointType) {
    let ref = `user/${userUID}/points/${pointType}`;

    firebase.database().ref(ref).once('value').then((snapshot) => {
      let val = snapshot.val() + 1;
      firebase.database().ref(ref).set(val);
    });
  }

  static getUserPoints(userUID) {
    let ref = `user/${userUID}/points`;
    return firebase.database().ref(ref).once('value');
  }

}
