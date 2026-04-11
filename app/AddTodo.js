"use client";

import { useState } from "react";

export default function AddTodo({ onAddTodo }) {
  const [title, setTitle] = useState("");

  return (
    <>
      <input />
      <button>Add</button>
    </>
  );
}
