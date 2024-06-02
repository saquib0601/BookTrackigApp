// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDYFH4D1Z0tCcJfVYXWsHX4mLP6N2XXGoA",
  authDomain: "booktrackerapp-9ea58.firebaseapp.com",
  projectId: "booktrackerapp-9ea58",
  storageBucket: "booktrackerapp-9ea58.appspot.com",
  messagingSenderId: "933260713254",
  appId: "1:933260713254:web:019ea3d453c26639bcf5e7",
  measurementId: "G-JKD4G0P5NX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();