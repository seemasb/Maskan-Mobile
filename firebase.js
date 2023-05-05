// import firebase from 'firebase/app';
// import 'firebase/auth';
// import 'firebase/database';
// import * as firebase from 'firebase';
import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAWGZsacYUe6gQkTwboJUChBE63sDMX7YU",
    authDomain: "maskan-chat.firebaseapp.com",
    projectId: "maskan-chat",
    storageBucket: "maskan-chat.appspot.com",
    messagingSenderId: "414529439970",
    appId: "1:414529439970:web:6018c52b7b299b93a976bb"
};

// if (!firebase.apps.length) {
//   firebase.initializeApp(firebaseConfig);
// }

// let app;
// if (firebase.apps.length === 0) {
//     app = firebase.initializeApp(firebaseConfig);
// } else {
//     app = firebase.app();
// }

// const app = initializeApp(firebaseConfig);

// const db = app.firestore();
// // const auth = firebase.auth();
// export { db };


// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
export { db };
