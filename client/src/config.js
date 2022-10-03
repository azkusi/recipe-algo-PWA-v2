// // Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
// // import 'firebase/compat/auth';
import 'firebase/compat/firestore';



// export const config = {
//   apiKey: "AIzaSyDt_KICb8jM4LODy7lLJZ9y5PZeRni3UZ0",
//   authDomain: "mealeasy-7c600.firebaseapp.com",
//   databaseURL: "https://mealeasy-7c600-default-rtdb.europe-west1.firebasedatabase.app",
//   projectId: "mealeasy-7c600",
//   storageBucket: "mealeasy-7c600.appspot.com",
//   messagingSenderId: "277026662201",
//   appId: "1:277026662201:web:fd8b2f11746087fc816ae8",
//   measurementId: "G-6XKQKQRG0L"
// };

// // firebase.initializeApp(config)
// // firebase.firestore().settings({timestampsInSnapshots: true})

// // export default config;

// // // Initialize Firebase
// const app = firebase.initializeApp(config);
// export const db = firebase.firestore()

// // const analytics = getAnalytics(app);




const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDt_KICb8jM4LODy7lLJZ9y5PZeRni3UZ0",
  authDomain: "mealeasy-7c600.firebaseapp.com",
  databaseURL: "https://mealeasy-7c600-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "mealeasy-7c600",
  storageBucket: "mealeasy-7c600.appspot.com",
  messagingSenderId: "277026662201",
  appId: "1:277026662201:web:fd8b2f11746087fc816ae8",
  measurementId: "G-6XKQKQRG0L"
});

export const db = firebaseApp.firestore();
    
// export default db;
