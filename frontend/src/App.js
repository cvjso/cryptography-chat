import "./App.css";
import { userStore } from "./store";
import LoginPage from "./components/loginPage";
import { ChatPage } from "./components/chats";

function App() {
  const isLogged = userStore((state) => state.isLogged);

  return <div className="App">{isLogged ? <ChatPage /> : <LoginPage />}</div>;
}

export default App;
