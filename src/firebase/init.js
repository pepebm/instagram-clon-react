import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

const config = {
    apiKey: "AIzaSyDAcXMQ1rNqQXIXb8bHSaBiEh3kQjw7Hws",
    authDomain: "myinstagram-bfb68.firebaseapp.com",
    databaseURL: "https://myinstagram-bfb68.firebaseio.com",
    projectId: "myinstagram-bfb68",
    storageBucket: "myinstagram-bfb68.appspot.com",
    messagingSenderId: "456573790116"
};

if (!firebase.apps.length) {
    firebase.initializeApp(config);
}

const auth = firebase.auth();
const db = firebase.database();
const storage = firebase.storage().ref();

export {
    auth,
    db,
    storage
};