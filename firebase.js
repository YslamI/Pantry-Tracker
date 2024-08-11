// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.API
  authDomain: process.env.DOM
  projectId: process.env.ID
  storageBucket: process.env.STORAGE
  messagingSenderId: process.env.SENDER_ID
  appId: process.env.APP_ID
  measurementId: process.env.MES_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firestore = getFirestore(app);

export {firestore}
