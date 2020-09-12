import firebase from "firebase";
import { actionTypes } from "./reducer";
import { useStateValue } from "./StateProvider";

const firebaseConfig = {
  apiKey: "AIzaSyAmUEkLk7PzWJLnACrIueryt8ubV1FCgOQ",
  authDomain: "quickstart-1550501068702.firebaseapp.com",
  databaseURL: "https://quickstart-1550501068702.firebaseio.com",
  projectId: "quickstart-1550501068702",
  storageBucket: "quickstart-1550501068702.appspot.com",
  messagingSenderId: "419712447770",
  appId: "1:419712447770:web:fdf32bff1133937b8768a3",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
// const db = firebaseApp.firestore()
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };

// export default db;
