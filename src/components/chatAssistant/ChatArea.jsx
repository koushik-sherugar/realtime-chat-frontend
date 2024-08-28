import React, { useEffect, useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import io from "socket.io-client";

const socket = io("http://localhost:1337");
const ChatArea = () => {
  const { user } = useAuthContext();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Load chat history from localStorage
    const savedMessages = JSON.parse(localStorage.getItem("chatHistory")) || [];
    setMessages(savedMessages);

    // Join the chat with username
    socket.emit("join", { username: user?.username || "Anonymous" });

    // Listen for incoming messages
    socket.on("message", (data) => {
      setMessages((prevMessages) => {
        const newMessages = [...prevMessages, { text: data.text, user: "bot" }];
        // Update localStorage
        localStorage.setItem("chatHistory", JSON.stringify(newMessages));
        return newMessages;
      });
    });

    return () => {
      socket.off("message");
    };
  }, [user]);

  const handleSendMessage = () => {
    if (message.trim() === "") return;

    const newMessage = { text: message, user: user?.username || "Me" };
    setMessages((prevMessages) => {
      const updatedMessages = [...prevMessages, newMessage];
      // Update localStorage
      localStorage.setItem("chatHistory", JSON.stringify(updatedMessages));
      return updatedMessages;
    });

    // Send the message via socket.io
    socket.emit("sendMessage", {
      user: user?.username || "Anonymous",
      message,
    });

    // Clear the input field
    setMessage("");
  };

  return (
    <>
      <div className="flex w-full h-screen overflow-hidden bg-gray-300">
        {/* <!-- Sidebar --> */}
        <div className="w-0 bg-white border-r border-gray-300 sm:w-1/4">
          {/* <!-- Sidebar Header --> */}
          <header className="flex items-center justify-between text-white bg-indigo-600 border-b border-gray-300 md:p-4">
            <h1 className="text-2xl font-semibold">Ayna Chat </h1>
            <div className="relative"></div>
          </header>

          {/* <!-- Contact List --> */}
          <div className="h-screen p-3 pb-20 overflow-y-auto mb-9">
            <div className="flex items-center p-2 mb-4 rounded-md cursor-pointer hover:bg-gray-100">
              <div className="w-12 h-12 mr-3 bg-gray-300 rounded-full">
                <img
                  src="https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
                  alt="User Avatar"
                  className="w-12 h-12 rounded-full"
                />
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-semibold">Alice</h2>
                <p className="text-gray-600">Hoorayy!!</p>
              </div>
            </div>
          </div>
        </div>

        {/* <!-- Main Chat Area --> */}
        <div className="flex-1">
          {/* <!-- Chat Header --> */}
          <header className="flex gap-2 p-4 text-gray-700 bg-white">
            <button className="visible focus:outline-none sm:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 text-gray-100"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path d="M2 10a2 2 0 012-2h12a2 2 0 012 2 2 2 0 01-2 2H4a2 2 0 01-2-2z" />
              </svg>
            </button>
            <h1 className="text-2xl font-semibold">Chat Bot</h1>
          </header>

          <div className="h-screen p-4 overflow-y-auto pb-36">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex mb-4 ${
                  msg.user === "bot" ? "justify-end" : ""
                }`}
              >
                {msg.user !== "bot" && (
                  <div className="flex items-center justify-center mr-2 rounded-full w-9 h-9">
                    <img
                      src="https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
                      alt="User Avatar"
                      className="w-8 h-8 rounded-full"
                    />
                  </div>
                )}

                <div
                  className={`flex gap-3 p-3 ${
                    msg.user == "bot"
                      ? "text-white bg-indigo-500"
                      : "bg-white text-gray-700"
                  } rounded-lg max-w-96`}
                >
                  <p>{msg.text}</p>
                </div>
                {msg.user == "bot" && (
                  <div className="flex items-center justify-center ml-2 rounded-full w-9 h-9">
                    <img
                      src="https://placehold.co/200x/b7a8ff/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
                      alt="My Avatar"
                      className="w-8 h-8 rounded-full"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

          <footer className="absolute bottom-0 w-full p-4 border-t border-gray-300 sm:w-3/4">
            <div className="flex items-center">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
                className="w-full p-2 border border-gray-400 rounded-md focus:outline-none focus:border-blue-500"
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              />
              <button
                onClick={handleSendMessage}
                className="px-4 py-2 ml-2 text-white bg-indigo-500 rounded-md"
              >
                Send
              </button>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
};

export default ChatArea;
