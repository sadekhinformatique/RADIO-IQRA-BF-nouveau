// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB6yLk-Sc1nxP7XtB3YtnCUKn3T6CNUPXE",
  authDomain: "sadekh-informatique.firebaseapp.com",
  projectId: "sadekh-informatique",
  storageBucket: "sadekh-informatique.firebasestorage.app",
  messagingSenderId: "842232362444",
  appId: "1:842232362444:web:2344905ba25b8c79bc5969",
  measurementId: "G-5LHVHXM0WC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics conditionally (it requires a browser environment)
export const analytics = typeof window !== "undefined" ? isSupported().then(yes => yes ? getAnalytics(app) : null) : null;

export default app;
