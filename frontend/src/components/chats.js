import { useCollectionData } from "react-firebase-hooks/firestore";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { useState } from "react";

firebase.initializeApp({
  apiKey: "AIzaSyCC1AgAz5_Y7k0rPUlxls7rkfAa6rwvJXM",
  authDomain: "ping-74a1b.firebaseapp.com",
  databaseURL: "https://ping-74a1b.firebaseio.com",
  projectId: "ping-74a1b",
  storageBucket: "ping-74a1b.appspot.com",
  messagingSenderId: "1001380170257",
  appId: "1:1001380170257:web:81580567f18b95299dbfb0",
});

const firestore = firebase.firestore();

export function ChatPage() {
  const messageRef = firestore.collection("messages");
  const query = messageRef.orderBy("createdAt").limit(25);
  const [messages] = useCollectionData(query, { idField: "id" });

  const [messageInput, setMessageInput] = useState("");

  return (
    <div>
      {messages &&
        messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}
      <div>
        <input
          type="text"
          value={messageInput}
          onChange={(e) => {
            setMessageInput(e.target.value);
          }}
        />
        <button>Submit</button>
      </div>
    </div>
  );
}

function ChatMessage(props) {
  const { text, uid } = props.message;
  return <p>{text}</p>;
}
