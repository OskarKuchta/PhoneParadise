import { FirebaseApp, initializeApp } from "firebase/app";
import { getFirestore, Firestore } from "firebase/firestore";
import { FirebaseConfig } from "../Types/Types";

const firebaseConfig: FirebaseConfig = {
  apiKey: "AIzaSyDxloi2QFu7gcImAbsCz_wqjcQYhAfiPaA",
  authDomain: "phone-paradise.firebaseapp.com",
  projectId: "phone-paradise",
  storageBucket: "phone-paradise.appspot.com",
  messagingSenderId: "342601028672",
  appId: "1:342601028672:web:4ca8b36533ed7fe6237ba5",
  measurementId: "G-9LX4PNP9DC",
};
export const app: FirebaseApp = initializeApp(firebaseConfig);
export const db: Firestore = getFirestore(app);
