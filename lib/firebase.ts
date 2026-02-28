/*
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBU0d0rNeGSbnYMn28kFUclE0bg5jr0QRk",
  authDomain: "photo-map-395d3.firebaseapp.com",
  projectId: "photo-map-395d3",
  storageBucket: "photo-map-395d3.firebasestorage.app",
  messagingSenderId: "187676160183",
  appId: "1:187676160183:web:8a1262646fd4fd5a721d32"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
*/

import { initializeApp } from "firebase/app";

import { getFirestore }
from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBU0d0rNeGSbnYMn28kFUclE0bg5jr0QRk",
  authDomain: "photo-map-395d3.firebaseapp.com",
  projectId: "photo-map-395d3",
  storageBucket: "photo-map-395d3.firebasestorage.app",
  messagingSenderId: "187676160183",
  appId: "1:187676160183:web:8a1262646fd4fd5a721d32"

};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)