import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBjlzSqBUKiPit4tOb5XvW1xnd_NORmrHE",
  authDomain: "fir-sample-16ac1.firebaseapp.com",
  projectId: "fir-sample-16ac1",
  storageBucket: "fir-sample-16ac1.appspot.com",
  messagingSenderId: "512462420994",
  appId: "1:512462420994:web:2a6fe67efc2db45e8c3b1b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);