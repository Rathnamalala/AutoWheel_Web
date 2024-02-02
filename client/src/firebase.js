// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "estate-704b2.firebaseapp.com",
  projectId: "estate-704b2",
  storageBucket: "estate-704b2.appspot.com",
  messagingSenderId: "514637629894",
  appId: "1:514637629894:web:25763ca6cf2e9ed2158ac7"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);