import React, { useEffect, useState, useRef } from "react";
import socketIOClient from "socket.io-client";
import { useSelector } from "react-redux"; // import useSelector
import { ArrowForwardIcon } from "../../exports";

function ChatBar() {
  const [response, setResponse] = useState([]);
  const [message, setMessage] = useState("");
  const [isOpen, setIsOpen] = useState(true);

  const socketRef = useRef();

  const sessionUser = useSelector((state) => state.session.user);

  useEffect(() => {
    const serverURL =
      process.env.NODE_ENV === "production"
        ? "https://devcomponent.onrender.com"
        : "http://localhost:5000";
    socketRef.current = socketIOClient(serverURL);
    // console.log("Connecting to server ...");

    socketRef.current.on("chat message", (message) => {
      // console.log("Chat message event triggered");
      setResponse((response) => {
        const updatedResponse = [...response, message];
        // console.log("Received message(client):", message);
        // console.log("Updated response:", updatedResponse);
        return updatedResponse;
      });
    });

    // setResponse(["Test message"]);

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);

  // console.log("Response state:", response);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message) {
      // console.log("Sending message:", message);
      socketRef.current.emit("chat message", {
        message,
        username: sessionUser.username,
        time: new Date().toLocaleTimeString(),
      });
      setMessage("");
    }
  };

  if (!sessionUser) {
    return null;
  }

  return (
    <div
      className={`flex flex-col bg-black text-white p-4 w-full transition-all duration-500 ${
        isOpen ? "max-h-full" : "max-h-16"
      }`}
    >
      <div
        className="flex justify-center text-3xl my-2 text-yellow-500 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        General Chat
      </div>
      {isOpen && (
        <div className="overflow-y-auto mt-2 mb-4 flex-grow">
          {response.map((item, index) => (
            <div
              key={index}
              className="mb-4 p-2 rounded bg-gray-800 flex items-center text-xl hover:bg-gray-700 transition-colors duration-200"
            >
              <p className="font-bold mr-2">{item.username}:</p>
              <p>{item.message}</p>
              <p className="ml-auto">{item.time}</p>
            </div>
          ))}
        </div>
      )}
      <form onSubmit={sendMessage} className="flex">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-grow mr-2 p-2 rounded border text-black text-xl"
        />
        <button
          type="submit"
          className="bg-teal-600 text-white rounded px-3 py-2"
        >
          Send
        </button>
      </form>
    </div>
  );
}

export default ChatBar;
