// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";

// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyAA5JDcXBedIgb0wFuykAtgv1K-NQ0qJz8",
//   authDomain: process.env.FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.FIREBASE_PROJECT_ID,
//   storageBucket: process.env.FIREBASE_STORAGE_BUCKET_ID,
//   messagingSenderId: process.env.FIREBASE_SENDER_ID,
//   appId: process.env.FIREBASE_APP_ID,
//   measurementId: process.env.FIREBASE_MEASUREMENT_ID,
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// export default app;

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAA5JDcXBedIgb0wFuykAtgv1K-NQ0qJz8",
  authDomain: "guessarena-ea0af.firebaseapp.com",
  projectId: "guessarena-ea0af",
  storageBucket: "guessarena-ea0af.appspot.com",
  messagingSenderId: "707419743054",
  appId: "1:707419743054:web:c3e4d39b8b44079644741f",
  measurementId: "G-3WVW2ZZBPP",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
