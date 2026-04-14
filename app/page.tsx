"use client";
import "./styles.css";
import { useState } from "react";
import { useReducer } from "react";
import { useRef } from "react";

export default function StopWatch() {
  const [seconds, setSeconds] = useState(0);
  const [intervalId, setIntervalId] = useState(null);

  function start() {
    if (intervalId) return;
    const id = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 10);
    setIntervalId(id);
  }

  function stopwatch() {
    clearInterval(intervalId);
    setIntervalId(null);
  }

  function reset() {
    stopwatch();
    setSeconds(0);
  }
  const secs = seconds;

  return (
    <>
      <h1>{secs}</h1>
      <button onClick={start}>Start</button>
      <button onClick={stopwatch}>Stop</button>
      <button onClick={reset}>Reset</button>
    </>
  );
}
