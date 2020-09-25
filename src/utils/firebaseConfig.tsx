import firebase from "firebase";
import { firebaseData } from "./secrets";

const firebaseApp = firebase.initializeApp(firebaseData);
const firestoreDb = firebaseApp.firestore();
const auth = firebase.auth();

export type firebaseData = firebase.firestore.QueryDocumentSnapshot<
  firebase.firestore.DocumentData
>;

export type firebaseTaskData = {
  title: string;
  description: string;
  isDue: boolean;
  isCompleted: boolean;
  created: string;
  dateString: string;
  isImportant: boolean;
  id: any;
};

export { auth, firestoreDb };
