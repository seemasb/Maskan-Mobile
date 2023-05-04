import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyAWGZsacYUe6gQkTwboJUChBE63sDMX7YU",
    authDomain: "maskan-chat.firebaseapp.com",
    projectId: "maskan-chat",
    storageBucket: "maskan-chat.appspot.com",
    messagingSenderId: "414529439970",
    appId: "1:414529439970:web:6018c52b7b299b93a976bb"
  };

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
