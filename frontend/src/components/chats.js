import { useCollectionData } from "react-firebase-hooks/firestore";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { useState } from "react";
import { decryptAES, encryptAES } from "../utils/AESAlgoritm";
import { userStore } from "../store";
import { doPost, ROUTES } from "../utils/requests";

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
  // Store
  const username = userStore((state) => state.username);
  const communicationKey = userStore((state) => state.communicationKey);

  // Get Messages from Firebase
  const messageRef = firestore.collection("messages");
  const query = messageRef.orderBy("createdAt").limit(25);
  const [messages] = useCollectionData(query, { idField: "id" });

  const [messageInput, setMessageInput] = useState("");

  const sendMessage = () => {
    const msg = encryptAES(messageInput, communicationKey);
    console.log(msg);
    doPost(ROUTES.sendMessage, {
      username: username,
      message: msg,
    })
      .then((response) => {
        if (response.status === "200") {
          console.log("tudo certo!");
        }
        console.log(response);
      })
      .catch((error) => console.log(error));
  };

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
        <button onClick={sendMessage}>Submit</button>
      </div>
    </div>
  );
}

function ChatMessage(props) {
  const communicationKey = userStore((state) => state.communicationKey);

  const { text, author } = props.message;
  return (
    <>
      <h4>{author}:</h4>
      {/* <p>{text}</p> */}
      <p>{decryptAES(text, communicationKey)}</p>
    </>
  );
}
