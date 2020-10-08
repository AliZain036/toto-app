import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAE6BH5Wgw30ckV0jEAKlnpTjS2VIOmvpQ",
  authDomain: "todo-app-cp-72e97.firebaseapp.com",
  databaseURL: "https://todo-app-cp-72e97.firebaseio.com",
  projectId: "todo-app-cp-72e97",
  storageBucket: "todo-app-cp-72e97.appspot.com",
  messagingSenderId: "467243029682",
  appId: "1:467243029682:web:026fb185d0a8947cefe5ab",
  measurementId: "G-7BM00NRCBC",
});

const db = firebaseApp.firestore();
export default db;
