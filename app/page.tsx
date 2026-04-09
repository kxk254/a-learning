"use client";
import { useState } from "react";

export default function MyInput() {
  const [text, setText] = useState(true);

  function handleChange(e) {
    setText(e.target.checked);
    console.log(e.target);
  }

  return (
    <>
      <label>
        <input type="checkbox" checked={text} onChange={handleChange} />I like
        this
      </label>
      <p>You {text ? "liked" : "did not like"} this.</p>
    </>
  );
}
