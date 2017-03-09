import { Platform } from 'react-native';
import * as firebase from 'firebase';
import RNFetchBlob from 'react-native-fetch-blob';

// Prepare Blob support
const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;

export default class FirebaseStorage {

  static uploadImage(uri, mime = 'application/octet-stream') {
    const storage = firebase.storage();

    return new Promise((resolve, reject) => {
      const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
      const sessionId = new Date().getTime();
      let uploadBlob = null;
      const imageRef = storage.ref('leafs').child(`${sessionId}.jpg`);

      fs.readFile(uploadUri, 'base64')
        .then((data) => Blob.build(data, { type: `${mime};BASE64` }))
        .then((blob) => {
          uploadBlob = blob;
          return imageRef.put(blob, { contentType: mime });
        })
        .then(() => {
          uploadBlob.close();
          return imageRef.getDownloadURL();
        })
        .then((url) => {
          resolve(url);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}
