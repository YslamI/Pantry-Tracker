// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDAFaISYnf_KrwObHcUfwFcPVYEP79T7YU",
  authDomain: "inventory-management-1b92d.firebaseapp.com",
  projectId: "inventory-management-1b92d",
  storageBucket: "inventory-management-1b92d.appspot.com",
  messagingSenderId: "978974452308",
  appId: "1:978974452308:web:a904d0c0277f44d1661bc1",
  measurementId: "G-0XY0MFB376"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firestore = getFirestore(app);

export {firestore}