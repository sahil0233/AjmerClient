// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDbPFQsr49TMiXN-PLLgsjpaW0-Sta70PY",
  authDomain: "ajmerstore-7d3af.firebaseapp.com",
  projectId: "ajmerstore-7d3af",
  storageBucket: "ajmerstore-7d3af.appspot.com",
  messagingSenderId: "238656911289",
  appId: "1:238656911289:web:15df28bfd574cc76daa868",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
const firestore = getFirestore(app);
export {
    app,
    auth,
    storage,
    firestore,
    firebaseConfig
};