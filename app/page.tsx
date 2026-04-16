"use client";
import "./styles.css";
import { useState, useEffect } from "react";
import { useReducer } from "react";
import { useRef, createContext, useContext, memo, useCallback } from "react";

import { createConnection } from "./chat.js";

function ChatRoom({ roomId }) {
  // use useState

  const [rserverUrl, setServerurl] = useState("https://localhose:1234");
  // useEffect
  useEffect =
    (() => {
      const connection = createConnection(serverUrl, roomId);
      connection.connect();
      return () => {
        connection.disconnect();
      };
    },
    [serverUrl, roomId]);
  // return html
  // show welcome to the room with server name
}

export function App() {
  // roomId and show(boolean)
  const [roomId, setRoomId] = useState("general");
  const [show, setShow] = useState(false);

  //return btml
  return (
    <>
      {" "}
      <label></label>
      <button></button>
    </>
  );
}
