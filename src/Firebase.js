// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';


// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBNR6RWFYm-ToazHdwdZC2UOHdlhKN5_4g",
  authDomain: "sdauthtest.firebaseapp.com",
  projectId: "sdauthtest",
  storageBucket: "sdauthtest.appspot.com",
  messagingSenderId: "389993904652",
  appId: "1:389993904652:web:61e8613ae680bdea6acc29",
  measurementId: "G-4VJY5GE6P8"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


// const analytics = getAnalytics(app);

export { db, app, auth };