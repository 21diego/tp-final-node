// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import firebase from 'firebase';

// Add the Firebase services that you want to use

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDmFT01v5U6hzy2pOJTQHiqHDH1xerb7Jc",
    authDomain: "taller-web-24759.firebaseapp.com",
    databaseURL: "https://taller-web-24759-default-rtdb.firebaseio.com",
    projectId: "taller-web-24759",
    storageBucket: "taller-web-24759.appspot.com",
    messagingSenderId: "555377176889",
    appId: "1:555377176889:web:18f61b81a34c2c49d5b8e8",
    measurementId: "G-REFRD1H356"
  };

// Initialize Firebase
const initializer = firebase.initializeApp(firebaseConfig);

export default {initializer}
