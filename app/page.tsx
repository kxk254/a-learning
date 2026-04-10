"use client";
import { useState } from "react";

export default function MyApp() {
  const [count, setCount] = useState([0, 0]);
  return (
    <div>
      <h1>Counter</h1>
      <MyButton count={count[0]} onclick={() => handleClick(0)} />
      <MyButton count={count[1]} onclick={() => handleClick(1)} />

      <ResetButton onReset={handleReset} />
    </div>
  );
}

function MyButton({ count, onClick }) {
  function handleClick() {
    setCount(count + 1);
  }

  return <button onClick={handleClick}>Clicked {count} times</button>;
}

function ResetButton({ setCount }) {
  function handleReset() {
    setCount(0);
  }
  return <button onClick={handleReset}>Reset</button>;
}
