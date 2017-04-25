import * as firebase from 'firebase';
import { Actions } from 'react-native-router-flux';


export default class Database {

  static getUserLeafList(userId, callback) {
    const path = `/user/${userId}/trees`;

    firebase.database().ref(path).on('value', (snapshot) => {
      callback(snapshot.val());
    });
  }

  static getTreeDetail(leafId, callback) {
    const path = `/tree/${leafId}`;

    firebase.database().ref(path).on('value', (snapshot) => {
      callback(snapshot.val());
    });
  }

  static getTreeList(callback) {
    const path = '/tree';

    firebase.database().ref(path).on('value', (snapshot) => {
      callback(snapshot);
    });
  }

  static saveAndGoToLeafDetail(user, photoURL, leaf) {
    let userLeafRef = `user/${user.uid}/trees/${leaf.id}`;

    // TODO: pridat GPS
    firebase.database().ref(userLeafRef).once('value').then((snapshot) => {
      let leafData = snapshot.val();
      let date = new Date();

      if (leafData === null) {
        // TODO: potrebne name atribut nahradit live datami pri nacitani listu
        leafData = {
          id: leaf.id,
          name: '',
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

      firebase.database().ref(userLeafRef).set(leafData).then(() => {
        Database.getTreeDetail(leaf.id, (tree) => {
          Actions.detail({ tree: tree, leaf: leafData, title: tree.latinName });
        });
      });
    });
  }
}
