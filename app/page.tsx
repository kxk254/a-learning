"use client";
import { useState } from "react";

function Square({ value, onClick }) {
  return <button onClick={onClick}>{value}</button>;
}

export default function Home() {
  const [squres, setSqures] = useState(Array(3).fill(null));

  function handleClick() {
    const nextSqure = squres.slice();
    nextSqure[0] = "X";
    setSqures(nextSqure);
  }
  return (
    <>
      <Square value={squres[0]} onClick={handleClick} />
      <Square value={squres[1]} onClick={handleClick} />
      <Square value={squres[2]} onClick={handleClick} />
    </>
  );
}
