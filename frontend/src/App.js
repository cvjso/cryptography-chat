import logo from './logo.svg';
import './App.css';

import firebase from "firebase/app";
import "firebase/firestore";

import {useCollectionData} from "react-firebase-hooks/firestore";

firebase.initializeApp({
  apiKey: "AIzaSyCC1AgAz5_Y7k0rPUlxls7rkfAa6rwvJXM",

  authDomain: "ping-74a1b.firebaseapp.com",

  databaseURL: "https://ping-74a1b.firebaseio.com",

  projectId: "ping-74a1b",

  storageBucket: "ping-74a1b.appspot.com",

  messagingSenderId: "1001380170257",

  appId: "1:1001380170257:web:81580567f18b95299dbfb0"

})

const firestore = firebase.firestore();

function App() {
  return (
    <div className="App">
      
    </div>
  );
}

export default App;
