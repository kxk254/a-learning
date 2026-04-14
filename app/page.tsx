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
      setSeconds((prev) => prev + 1);
    }, 10);
  }

  function stopwatch() {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  }

  function reset() {
    stopwatch();
    setSeconds(0);
  }
  const secs = seconds;

  return (
    <>
      <h1>{seconds}</h1>
      <button onClick={start}>Start</button>
      <button onClick={stopwatch}>Stop</button>
      <button onClick={reset}>Reset</button>
      <h1>{intervalRef.current ? intervalRef.current : "null"}</h1>
    </>
  );
}
