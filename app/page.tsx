"use client";
import { useState } from "react";

export default function MyObject() {
  const [form, setForm] = useState({
    firstName: "Kenji",
    lastName: "Konno",
    email: "kkonno@soliton-cm.com",
  });

  function fnHandler(e) {
    setForm({ ...form, firstName: e.target.value });
  }
  function lnHandler(e) {
    setForm({ ...form, lastName: e.target.value });
  }
  function emHandler(e) {
    setForm({ ...form, email: e.target.value });
  }

  return (
    <>
      <p>
        FirstName:
        <input value={form.firstName} onChange={fnHandler} />
      </p>
      <p>
        LastName:
        <input value={form.lastName} onChange={lnHandler} />
      </p>
      <p>
        Email:
        <input value={form.email} onChange={emHandler} />
      </p>
      <p>
        {form.firstName} | {form.lastName} - ({form.email})
      </p>
    </>
  );
}
