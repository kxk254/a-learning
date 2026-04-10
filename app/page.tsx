"use client";
import { useState } from "react";

export default function MyCheckbox() {
  const [liked, setLiked] = useState(true);

  function handleChange(e) {
    setLiked(e.target.checked);
  }

  return (
    <>
      <p>
        <input type="checkbox" checked={liked} onChange={handleChange} />I Liked
        this
      </p>
      <p>You {liked ? "liked" : "did not like"}this.</p>
    </>
  );
}
