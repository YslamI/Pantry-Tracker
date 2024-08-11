// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: API,
  authDomain: DOM,
  projectId: ID,
  storageBucket: STORAGE,
  messagingSenderId: SENDER_ID,
  appId: APP_ID,
  measurementId: MES_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firestore = getFirestore(app);

export {firestore}
