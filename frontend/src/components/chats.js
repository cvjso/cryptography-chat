import { useCollectionData } from "react-firebase-hooks/firestore";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { useState } from "react";
import { decryptAES, encryptAES } from "../utils/AESAlgoritm";
import { userStore } from "../store";
import { doPost, ROUTES } from "../utils/requests";
import "./chats.css";
import { Slide, Button, Input } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

const firebaseConfig = {
  apiKey: "AIzaSyCC1AgAz5_Y7k0rPUlxls7rkfAa6rwvJXM",
  authDomain: "ping-74a1b.firebaseapp.com",
  databaseURL: "https://ping-74a1b.firebaseio.com",
  projectId: "ping-74a1b",
  storageBucket: "ping-74a1b.appspot.com",
  messagingSenderId: "1001380170257",
  appId: "1:1001380170257:web:81580567f18b95299dbfb0",
};

firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore();

export function ChatPage() {
  // Store
  const username = userStore((state) => state.username);
  const communicationKey = userStore((state) => state.communicationKey);
  const logout = userStore((state) => state.logout);

  // Get Messages from Firebase
  const messageRef = firestore.collection("messages");
  const query = messageRef.orderBy("createdAt").limit(25);
  const [messages] = useCollectionData(query, { idField: "id" });

  const [messageInput, setMessageInput] = useState("");

  const sendMessage = () => {
    if (messageInput) {
      const msg = encryptAES(messageInput, communicationKey);
      doPost(ROUTES.sendMessage, {
        username: username,
        message: msg,
      })
        .then((response) => {
          console.log("tudo certo!");
          setMessageInput("");
        })
        .catch((error) => console.log(error));
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className="window">
      <header className="window-header">Messsages</header>
      <div className="chat">
        {messages &&
          messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}
        <div className="message-container">
          <Input
            type="text"
            value={messageInput}
            onChange={(e) => {
              setMessageInput(e.target.value);
            }}
            onKeyDown={handleKeyPress}
            sx={{
              width: "75%",
              background: "rgba(255, 255, 255, 0.637)",
              padding: "0px 5px",
              borderTopLeftRadius: "10px",
              borderTopRightRadius: "10px",
            }}
          />
          <Button
            sx={{ padding: "0", width: "20px!important" }}
            onClick={sendMessage}
            variant="contained"
          >
            <SendIcon />
          </Button>

          <Button
            sx={{ padding: "0", width: "20px!important" }}
            onClick={logout}
            variant="outlined"
            title="Logout"
          >
            <ExitToAppIcon />
          </Button>
        </div>
      </div>
    </div>
  );
}

function ChatMessage(props) {
  const communicationKey = userStore((state) => state.communicationKey);
  const username = userStore((state) => state.username);

  const { text, author } = props.message;
  return (
    <Slide mountOnEnter direction="up" in={true} unmountOnExit>
      <div id={author === username ? "mine" : "others"}>
        <p id="owner">{author}</p>
        {/* <p>{text}</p> */}
        <p>{decryptAES(text, communicationKey)}</p>
      </div>
    </Slide>
  );
}
