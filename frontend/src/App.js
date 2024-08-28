import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./components/home/Home.jsx";
import ChatsPage from "./components/chatsPage/ChatsPage.jsx";
import Navbar from "./components/navbar/Navbar.jsx";
import { useContext } from "react";
import { ChatContext } from "./Context/ChatProvider.js";

function App() {
  const { user } = useContext(ChatContext);
  // console.log("User : ", user);
  return (
    <div className="App">
      {user && (<Navbar />)}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chats" element={<ChatsPage />} />
      </Routes>
    </div>
  );
}

export default App;
