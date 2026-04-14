"use client";
import "./styles.css";
import { useState } from "react";
import { useReducer } from "react";
import { useRef } from "react";

export default function StopWatch() {
  const [seconds, setSeconds] = useState(0);
  const intervalRef = useRef(null);

  function start() {
    if (intervalRef.current) return;
    intervalRef.current = setInterval(() => {
      setSeconds((p) => p + 1);
    }, 10);
  }

  function stop() {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  }

  function reset() {
    setSeconds(0);
    stop();
  }

  return (
    <>
      <h1>{seconds}</h1>
      <button onClick={start}>Start</button>
      <button onClick={stop}>Stop</button>
      <button onClick={reset}>Reset</button>
      <h1>{intervalRef.current ? intervalRef.current : "null"}</h1>
    </>
  );
}
