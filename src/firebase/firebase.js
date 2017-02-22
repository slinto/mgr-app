import * as firebase from "firebase";

export default class Firebase {

  /**
   * Initialises Firebase
   */
  static initialise() {
    firebase.initializeApp({
      apiKey: "AIzaSyBHSzRfDsq-zqt5z3StK9f3HyHM6HvODQM",
      authDomain: "leafproject-3884d.firebaseapp.com",
      databaseURL: "https://leafproject-3884d.firebaseio.com",
      storageBucket: "leafproject-3884d.appspot.com",
      messagingSenderId: "334690595765"
    });
  }

}
