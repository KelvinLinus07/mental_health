import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCgIfiMzYFcukXitPRCAA_5uhC7OTI0xxI",
  authDomain: "student-wellness-736fd.firebaseapp.com",
  projectId: "student-wellness-736fd",
  storageBucket: "student-wellness-736fd.firebasestorage.app",
  messagingSenderId: "158575316451",
  appId: "1:158575316451:web:88953a97e02dfe67cfa4d6"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);