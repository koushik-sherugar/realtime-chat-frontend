import { Routes, BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";

import Navbar from "./components/Navbar";
// import { UserAuthContextProvider } from "./context/AuthContext";
import UserRoutes from "./routes/UserRoutes";
import ChatArea from "./components/chatAssistant/ChatArea";
import AuthProvider from "./context/AuthProvider";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
// import  from "socket.io-client"
// import * as socket from "socket.io-client";

import { useEffect, useState } from "react";

import io from "socket.io-client"; // Import socket.io-client

const socket = io("http://localhost:1337");
function App() {
  //
  // const [messages, setMessages] = useState([]);
  // const [message, setMessage] = useState("");

  // const io = socket("http://localhost:1337");
  // let welcome;

  // useEffect(() => {
  //   io.emit("join", { username }, (error) => {
  //     //Sending the username to the backend as the user connects.
  //     if (error) return alert(error);
  //   });
  //   io.on("welcome", async (data, error) => {
  //     //Getting the welcome message from the backend
  //     let welcomeMessage = {
  //       user: data.user,
  //       message: data.text,
  //     };
  //     welcome = welcomeMessage;
  //     setMessages([welcomeMessage]); //Storing the Welcome Message
  //     await fetch("http://localhost:1337/api/messages") //Fetching all messages from Strapi
  //       .then(async (res) => {
  //         const response = await res.json();
  //         let arr = [welcome];
  //         response.data.map((one, i) => {
  //           arr = [...arr, one.attributes];
  //           setMessages((msgs) => arr); // Storing all Messages in a state variable
  //         });
  //       })
  //       .catch((e) => console.log(e.message));
  //   });
  //   io.on("message", async (data, error) => {
  //     //Listening for a message connection
  //     await fetch("http://localhost:1337/api/messages")
  //       .then(async (res) => {
  //         const response = await res.json();
  //         let arr = [welcome];
  //         response.data.map((one, i) => {
  //           arr = [...arr, one.attributes];
  //           setMessages((msgs) => arr);
  //         });
  //       })
  //       .catch((e) => console.log(e.message));
  //   });
  // }, [username]);

  // useEffect(() => {
  //   socket.emit("join", { username: "user1" }); // Emit the 'join' event on connection

  //   socket.on("welcome", (data) => {
  //     setMessages((prevMessages) => [...prevMessages, data.text]);
  //   });

  //   socket.on("message", (data) => {
  //     setMessages((prevMessages) => [...prevMessages, data.text]);
  //   });

  //   return () => {
  //     socket.off("message");
  //     socket.off("welcome");
  //   };
  // }, []);

  // const sendMessage = (msg) => {
  //   socket.emit("sendMessage", { user: "user1", message: msg });
  //   setMessage(""); // Clear input after sending
  // };

  //
  return (
    <AuthProvider>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        pauseOnHover={false}
        draggable
        theme="light"
      />
      {/* <Navbar /> */}
      {/* <div>
        <div>
          {messages.map((msg, index) => (
            <div key={index}>{msg}</div>
          ))}
        </div>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={() => sendMessage(message)}>Send</button>
      </div> */}
      <ChatArea />
      {/* <SignUp /> */}
      {/* <SignIn /> */}
      <Routes>
        {/* Login Routes */}
        {/* {UserRoutes()} */}
      </Routes>
    </AuthProvider>
  );
}

export default App;
