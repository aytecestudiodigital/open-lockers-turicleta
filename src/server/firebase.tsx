// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCFmxrerruRRYee2zHl_zRTvf-X3HsV8BE",
  authDomain: "turi-platform.firebaseapp.com",
  projectId: "turi-platform",
  storageBucket: "turi-platform.appspot.com",
  messagingSenderId: "1031499466871",
  appId: "1:1031499466871:web:4b91a891e60c796e7a1e72",
  measurementId: "G-8W1FWE8PNF"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const analytics = getAnalytics(firebaseApp);
export const db = getFirestore()