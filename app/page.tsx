"use client";
import { useState } from "react";

export default function Form() {
  const [name, setName] = useState("name");
  const [age, setAge] = useState(40);

  function handleAge() {
    base();
    base();
    base();
  }

  function base() {
    setAge((age) => age + 1);
  }
  return (
    <>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <button onClick={handleAge}>Age Plus</button>
      <p>
        Hello, {name}. you are {age} yrs old.
      </p>
    </>
  );
}
