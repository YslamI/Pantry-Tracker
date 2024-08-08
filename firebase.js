// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "#####################################",
  authDomain: "########################################",
  projectId: "#####################################",
  storageBucket: "########################################",
  messagingSenderId: "################",
  appId: "##############################",
  measurementId: "#-##############"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firestore = getFirestore(app);

export {firestore}
